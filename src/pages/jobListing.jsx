import { useEffect, useState, useRef } from "react";
import { useUser } from "@clerk/clerk-react";
// import { State } from "country-state-city";
import { BarLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch";
// import { City } from "country-state-city"; 

import JobCard from "@/components/job-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getCompanies } from "@/api/apiCompanies";
import { getJobs } from "@/api/apiJobs";

// Add major Canadian cities that should always be available
const MAJOR_CANADIAN_CITIES = [
  // Major Metropolitan Areas
  "Toronto","Montreal","Vancouver","Calgary","Edmonton","Ottawa-Gatineau",
  "Winnipeg","Quebec City","Hamilton","Kitchener-Waterloo-Cambridge", 
  "Ontario","Alberta","British Columbia","Nova Scotia","New Brunswick", 
  "Newfoundland & Labrador","Prince Edward Island","Saskatchewan","Manitoba",
  "Yukon","Northwest Territories","Nunavut",

  // Ontario Cities (40 existing + 18 added = 58)
  "Mississauga","Brampton","Windsor","London","Markham",
  "Vaughan","Richmond Hill","Oakville","Burlington","Oshawa",
  "Barrie","Kingston","Guelph","Cambridge","Whitby",
  "Milton","Thunder Bay","Sudbury","Waterloo","Ajax",
  "St. Catharines","Niagara Falls","Newmarket","Peterborough",
  "Brantford","Pickering","Belleville","Sarnia","Sault Ste. Marie",
  "Welland","North Bay","Cornwall","Orillia","Stratford",
  // Added Ontario cities
  "Clarington","Halton Hills","Caledon","East Gwillimbury","Innisfil",
  "Midland","Collingwood","Wasaga Beach","Gravenhurst","Bracebridge",
  "Huntsville","Elliot Lake","Sault Ste. Marie","Temiskaming Shores",
  "Kirkland Lake","Kapuskasing","Hearst","Moosonee","Greater Sudbury",

  // Quebec Cities (20 existing + 26 added = 46)
  "Laval","Longueuil","Sherbrooke","Trois-Rivières","Lévis",
  "Saguenay","Terrebonne","Repentigny","Brossard","Drummondville",
  "Saint-Jérôme","Granby","Shawinigan","Rimouski","Sorel-Tracy",
  "Victoriaville","Rouyn-Noranda","Mascouche","Blainville","Mirabel",
  // Added Quebec cities
  "Alma","Amos","Baie-Comeau","Beaconsfield","Beauharnois","Boisbriand",
  "Boucherville","Bromont","Candiac","Châteauguay","Dollard-des-Ormeaux",
  "Lévis","Magog","Mont-Laurier","Montmagny","Mont-Saint-Hilaire",
  "Mont-Tremblant","Pincourt","Pont-Rouge","Port-Cartier","Prévost",
  "Rawdon","Rivière-du-Loup","Rosemère","Saint-Basile-le-Grand",
  "Saint-Bruno-de-Montarville","Saint-Charles-Borromée","Saint-Constant",
  "Sainte-Adèle","Sainte-Agathe-des-Monts","Sainte-Marie","Sainte-Thérèse",
  "Saint-Eustache","Saint-Félicien","Saint-Lambert","Saint-Lazare",
  "Saint-Pascal","Saint-Raymond","Saint-Sauveur","Saint-Tite","Sept-Îles",
  "Thetford Mines","Val-d'Or","Varennes","Vaudreuil-Dorion",

  // British Columbia (25 existing + 28 added = 53)
  "Surrey","Burnaby","Richmond","Kelowna","Abbotsford",
  "Coquitlam","Delta","Nanaimo","Victoria","Kamloops",
  "Prince George","Langley","Saanich","Chilliwack","Maple Ridge",
  "Port Coquitlam","North Vancouver","West Vancouver","Vernon",
  "Mission","Port Moody","Squamish","White Rock","Penticton",
  // Added BC cities
  "New Westminster","New Westminster","Abbotsford","Langley","Chilliwack",
  "Port Moody","Maple Ridge","Port Coquitlam","Squamish","White Rock",
  "Nanaimo","Kamloops","Mission","Kelowna","Richmond",

  // Alberta (20 existing + 0 added)
  "Red Deer","Lethbridge","Medicine Hat","St. Albert","Fort McMurray",
  "Airdrie","Grande Prairie","Spruce Grove","Leduc","Okotoks",
  "Cochrane","Camrose","Brooks","Canmore","Lloydminster",
  "Beaumont","Cold Lake","Sylvan Lake","Chestermere","Lacombe","Wetaskiwin",

  // Manitoba (10 existing + 0 added)
  "Winnipeg","Brandon","Thompson","Portage la Prairie","Steinbach",
  "Winkler","Selkirk","Dauphin","Morden","Flin Flon",

  // Saskatchewan (10 existing + 0 added)
  "Saskatoon","Regina","Prince Albert","Moose Jaw","Swift Current",
  "Yorkton","North Battleford","Warman","Weyburn","Estevan",

  // Nova Scotia (10 existing + 0 added)
  "Halifax","Dartmouth","Sydney","Truro","New Glasgow",
  "Kentville","Bridgewater","Amherst","Yarmouth","Port Hawkesbury",

  // New Brunswick (10 existing + 0 added)
  "Saint John","Moncton","Fredericton","Miramichi","Edmundston",
  "Bathurst","Campbellton","Oromocto","Grand Falls","Sussex",

  // Newfoundland & Labrador (9 existing + 1 added = 10)
  "St. John's","Mount Pearl","Corner Brook","Grand Falls-Windsor",
  "Gander","Labrador City","Carbonear","Bay Roberts","Stephenville","Clarenville",

  // PEI (9 existing + 0 added)
  "Charlottetown","Summerside","Stratford","Cornwall","Montague",
  "Kensington","Souris","Alberton","Georgetown",

  // Northern Territories (10 existing + 0 added)
  "Whitehorse","Yellowknife","Iqaluit","Hay River","Fort Smith",
  "Inuvik","Rankin Inlet","Cambridge Bay","Baker Lake","Arviat"
];

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const [citySearchTerm, setCitySearchTerm] = useState("");
  const [companySearchTerm, setCompanySearchTerm] = useState("");
  const citySearchInputRef = useRef(null);
  const companySearchInputRef = useRef(null);
  const selectGroupRef = useRef(null);
  const companySelectGroupRef = useRef(null);

  const { isLoaded } = useUser();

  const {
    data: companies,
    fn: fnCompanies,
    error: companiesError,
  } = useFetch(getCompanies, { requireAuth: false });
  

  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoadingJobs(true);
        const data = await getJobs(null, {
          location: location || null,
          company_id: company_id || null,
        });
    
        const filteredData = data?.filter((job) => {
          const search = searchQuery.toLowerCase();
          const companyName = job.company?.name?.toLowerCase() || "";
          return (
            job.title?.toLowerCase().includes(search) ||
            companyName?.toLowerCase().includes(search) ||
            job.location?.toLowerCase().includes(search) ||
            job.description?.toLowerCase().includes(search)
          );
        });
    
        setJobs(filteredData || []);
      } catch (err) {
        console.error("Job fetch error:", err);
      } finally {
        setLoadingJobs(false);
      }
    };
  
    fetchJobs();
  }, [location, company_id, searchQuery]);


  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded, location, company_id, searchQuery]);
  
  if (companiesError) {
    console.error("Error fetching companies:", companiesError);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query = formData.get("search-query");
    if (query) setSearchQuery(query);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setCompany_id("");
    setLocation("");
  };

  // Add effect to maintain focus on the search input and reset scroll position
  useEffect(() => {
    // Focus input when there's text
    if (citySearchTerm && citySearchInputRef.current) {
      citySearchInputRef.current.focus();
    }
    
    // Reset scroll position when search term changes or is cleared
    if (selectGroupRef.current) {
      selectGroupRef.current.scrollTop = 0;
    }
  }, [citySearchTerm]);

  // Create a specialized handler for city search changes
  const handleCitySearchChange = (e) => {
    setCitySearchTerm(e.target.value);
    
    // Immediate refocus
    if (citySearchInputRef.current) {
      setTimeout(() => citySearchInputRef.current.focus(), 0);
    }
  };

  // Handle key down events in the city search input
  const handleCitySearchKeyDown = (e) => {
    // Prevent default behavior for all keys to maintain focus
    e.stopPropagation();
  };

  // Reset search term when dropdown closes
  const handleCitySelectOpenChange = (open) => {
    if (!open) {
      setCitySearchTerm("");
    }
  };

  // Function to get better filtered cities list (optimized and error-proof)
  const getFilteredCities = () => {
    let libraryCities = [];
    try {
      if (typeof City !== 'undefined' && City.getAllCities) {
        libraryCities = City.getAllCities()
          .filter(city => city && city.countryCode === "CA" && typeof city.name === 'string' && city.name.trim())
          .map(city => city.name.trim());
      }
    } catch (e) {
      libraryCities = [];
    }

    // Combine with our custom list and remove duplicates, filter out invalid values
    const allCities = Array.from(new Set([
      ...libraryCities,
      ...MAJOR_CANADIAN_CITIES.filter(c => typeof c === 'string' && c.trim())
    ])).filter(Boolean);

    if (!citySearchTerm) {
      return allCities;
    }

    const searchTerm = citySearchTerm.toLowerCase().trim();
    if (!searchTerm) return allCities;

    // First find cities that start with the search term (higher priority)
    const startsWithMatches = allCities.filter(city =>
      city.toLowerCase().startsWith(searchTerm)
    );

    // Then find cities that include the search term somewhere
    const includesMatches = allCities.filter(city =>
      city.toLowerCase().includes(searchTerm) &&
      !city.toLowerCase().startsWith(searchTerm)
    );

    // Return cities that start with the term first, then others
    return [...startsWithMatches, ...includesMatches];
  };

  // Add effect to maintain focus on the company search input
  useEffect(() => {
    // Focus input when there's text
    if (companySearchTerm && companySearchInputRef.current) {
      companySearchInputRef.current.focus();
    }
    
    // Reset scroll position when search term changes or is cleared
    if (companySelectGroupRef.current) {
      companySelectGroupRef.current.scrollTop = 0;
    }
  }, [companySearchTerm]);

  // Create a specialized handler for company search changes
  const handleCompanySearchChange = (e) => {
    setCompanySearchTerm(e.target.value);
    
    // Immediate refocus
    if (companySearchInputRef.current) {
      setTimeout(() => companySearchInputRef.current.focus(), 0);
    }
  };

  // Handle key down events in the company search input
  const handleCompanySearchKeyDown = (e) => {
    // Prevent default behavior for all keys to maintain focus
    e.stopPropagation();
  };

  // Reset search term when dropdown closes
  const handleCompanySelectOpenChange = (open) => {
    if (!open) {
      setCompanySearchTerm("");
    }
  };

  // Function to filter companies based on search term
  const getFilteredCompanies = () => {
    if (!companies) return [];
    
    if (!companySearchTerm) {
      return companies;
    }
    
    const searchTerm = companySearchTerm.toLowerCase().trim();
    
    // First find companies that start with the search term (higher priority)
    const startsWithMatches = companies.filter(company => 
      company.name.toLowerCase().startsWith(searchTerm)
    );
    
    // Then find companies that include the search term somewhere
    const includesMatches = companies.filter(company => 
      company.name.toLowerCase().includes(searchTerm) && 
      !company.name.toLowerCase().startsWith(searchTerm)
    );
    
    // Return companies that start with the term first, then others
    return [...startsWithMatches, ...includesMatches];
  };

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="container">
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8 mt-10">
        Latest Jobs
      </h1>
      <form
        onSubmit={handleSearch}
        className="h-14 flex flex-row w-full gap-2 items-center mb-3"
      >
        <Input
          type="text"
          placeholder="Search Jobs by Title.."
          name="search-query"
          className="h-full flex-1  px-4 text-md"
        />
        <Button type="submit" className="h-full sm:w-28 text-white" variant="blue">
          Search
        </Button>
      </form>

      <div className="flex flex-col sm:flex-row gap-2">
      <Select 
        value={location} 
        onValueChange={(value) => setLocation(value)}
        onOpenChange={handleCitySelectOpenChange}
      >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent className="relative">
            <div className="sticky top-0 z-10 bg-background pt-2 px-2 pb-2 border-b">
              <div className="relative">
                <Input
                  ref={citySearchInputRef}
                  placeholder="Search cities..."
                  value={citySearchTerm}
                  onChange={handleCitySearchChange}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  onKeyDown={handleCitySearchKeyDown}
                  onFocus={(e) => e.stopPropagation()}
                  onBlur={(e) => {
                    setTimeout(() => {
                      if (citySearchInputRef.current && citySearchTerm) {
                        citySearchInputRef.current.focus();
                      }
                    }, 0);
                  }}
                  autoComplete="off"
                  className="mb-1 pr-8"
                />
                {citySearchTerm && (
                  <Button
                    type="button"
                    variant="ghost"
                    className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCitySearchTerm("");
                      if (citySearchInputRef.current) {
                        setTimeout(() => citySearchInputRef.current.focus(), 0);
                      }
                    }}
                  >
                    <span className="sr-only">Clear</span>
                    <span aria-hidden="true">×</span>
                  </Button>
                )}
              </div>
            </div>
             <SelectGroup className="overflow-y-auto max-h-[200px]">
                    {getFilteredCities().length > 0 ? (
                      getFilteredCities()
                        .sort((a, b) => a.localeCompare(b))
                        .map((name) => (
                          <SelectItem key={name} value={name}>
                            {name}
                          </SelectItem>
                        ))
                    ) : (
                      <div className="px-2 py-1 text-sm text-gray-500">
                        No cities found
                      </div>
                    )}
                  </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={company_id}
          onValueChange={(value) => setCompany_id(value)}
          onOpenChange={handleCompanySelectOpenChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent className="relative">
            <div className="sticky top-0 z-10 bg-background pt-2 px-2 pb-2 border-b">
              <div className="relative">
                <Input
                  ref={companySearchInputRef}
                  placeholder="Search companies..."
                  value={companySearchTerm}
                  onChange={handleCompanySearchChange}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  onKeyDown={handleCompanySearchKeyDown}
                  onFocus={(e) => e.stopPropagation()}
                  onBlur={(e) => {
                    setTimeout(() => {
                      if (companySearchInputRef.current && companySearchTerm) {
                        companySearchInputRef.current.focus();
                      }
                    }, 0);
                  }}
                  autoComplete="off"
                  className="mb-1 pr-8"
                />
                {companySearchTerm && (
                  <Button
                    type="button"
                    variant="ghost"
                    className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCompanySearchTerm("");
                      if (companySearchInputRef.current) {
                        setTimeout(() => companySearchInputRef.current.focus(), 0);
                      }
                    }}
                  >
                    <span className="sr-only">Clear</span>
                    <span aria-hidden="true">×</span>
                  </Button>
                )}
              </div>
            </div>
            <SelectGroup 
              ref={companySelectGroupRef}
              className="overflow-y-auto max-h-[200px]"
            >
              {getFilteredCompanies().map(({ name, id }) => (
                <SelectItem key={id} value={id}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        
        <Button
          className="sm:w-1/2"
          variant="destructive"
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      </div>

      {loadingJobs && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      )}

      {loadingJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs?.length ? (
            jobs.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  savedInit={job?.saved?.length > 0}
                />
              );
            })
          ) : (
            <div>No Jobs Found 😢</div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;