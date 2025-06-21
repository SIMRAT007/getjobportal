import { getCompanies } from "@/api/apiCompanies";
import { addNewJob } from "@/api/apiJobs";
import AddCompanyDrawer from "@/components/add-company-drawer";
import { Button } from "@/components/ui/button";
import "../index.css";
// import { City } from "country-state-city";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
// import { State } from "country-state-city";
import { useEffect, useState, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { z } from "zod";

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

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  location: z.string().min(1, { message: "Select a location" }),
  company_id: z.string().min(1, { message: "Select or Add a new Company" }),
  requirements: z.string().min(1, { message: "Requirements are required" }),
});

const PostJob = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [companySearchTerm, setCompanySearchTerm] = useState("");
  const [citySearchTerm, setCitySearchTerm] = useState("");
  const citySearchInputRef = useRef(null);
  const companySearchInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { location: "", company_id: "", requirements: "" },
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingCreateJob,
    error: errorCreateJob,
    data: dataCreateJob,
    fn: fnCreateJob,
  } = useFetch(addNewJob);

  const [showSuccess, setShowSuccess] = useState(false);

  const onSubmit = (data) => {
    fnCreateJob({
      ...data,
      recruiter_id: user.id,
      isOpen: true,
    });
  };

  useEffect(() => {
    if (dataCreateJob?.length > 0) {
      setShowSuccess(true);
      // Add a small delay before redirecting to show the success state
      const timer = setTimeout(() => {
        navigate("/jobs");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [loadingCreateJob]);

  const {
    loading: loadingCompanies,
    data: companies,
    fn: fnCompanies,
  } = useFetch(getCompanies);

  const filteredCompanies = () => {
    if (!companies) return [];
    
    if (!companySearchTerm) {
      return companies;
    }
    
    const searchTerm = companySearchTerm.toLowerCase().trim();
    
    const startsWithMatches = companies.filter(company => 
      company.name.toLowerCase().startsWith(searchTerm)
    );
    
    const includesMatches = companies.filter(company => 
      company.name.toLowerCase().includes(searchTerm) && 
      !company.name.toLowerCase().startsWith(searchTerm)
    );
    
    return [...startsWithMatches, ...includesMatches];
  };

  // Get filtered cities based on search term
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

  useEffect(() => {
    if (citySearchTerm && citySearchInputRef.current) {
      setTimeout(() => citySearchInputRef.current.focus(), 0);
    }
  }, [citySearchTerm]);



  // Handle company search focus
  useEffect(() => {
    if (companySearchTerm && companySearchInputRef.current) {
      setTimeout(() => companySearchInputRef.current.focus(), 0);
    }
  }, [companySearchTerm]);

  // Reset search terms when dropdown closes
  const handleCitySelectOpenChange = (open) => {
    if (!open) {
      setCitySearchTerm("");
    }
  };

  const handleCompanySelectOpenChange = (open) => {
    if (!open) {
      setCompanySearchTerm("");
    }
  };

  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
  }, [isLoaded]);

  if (!isLoaded || loadingCompanies) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  if (user?.unsafeMetadata?.role !== "recruiter") {
    return <Navigate to="/jobs" />;
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="gradient-title font-extrabold text-5xl sm:text-6xl text-center mb-2">
          Post a Job
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Create a compelling job listing to attract the best talent
        </p>
        
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 transition-all duration-300 hover:shadow-xl">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Job Title
              </label>
              <Input 
                id="title"
                placeholder="e.g. Senior Software Engineer"
                className="w-full transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                {...register("title")} 
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Brief Description
              </label>
              <Textarea 
                id="description"
                placeholder="Write a short and engaging description of the role"
                className="w-full min-h-[100px] transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                {...register("description")} 
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <Controller
                  name="location"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      onOpenChange={handleCitySelectOpenChange}
                    >
                      <SelectTrigger id="location" className="w-full transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent className="relative">
                        <div className="sticky top-0 z-10 bg-background pt-2 px-2 pb-2 border-b">
                          <div className="relative">
                            <Input
                              ref={citySearchInputRef}
                              placeholder="Search cities..."
                              value={citySearchTerm}
                              onChange={(e) => {
                                setCitySearchTerm(e.target.value);
                                // Ensure immediate refocus
                                setTimeout(() => {
                                  if (citySearchInputRef.current) {
                                    citySearchInputRef.current.focus();
                                  }
                                }, 0);
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                              }}
                              onKeyDown={(e) => {
                                e.stopPropagation();
                                // Prevent dropdown from closing on Enter key
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                }
                              }}
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
                  )}
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.location.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                  Company
                </label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Controller
                      name="company_id"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          onOpenChange={handleCompanySelectOpenChange}
                        >
                          <SelectTrigger id="company" className="w-full transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                            <SelectValue placeholder="Select company">
                              {field.value
                                ? companies?.find((com) => com.id === Number(field.value))?.name
                                : "Select company"}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent className="relative">
                            <div className="sticky top-0 z-10 bg-background pt-2 px-2 pb-2 border-b">
                              <div className="relative">
                                <Input
                                  ref={companySearchInputRef}
                                  placeholder="Search companies..."
                                  value={companySearchTerm}
                                  onChange={(e) => setCompanySearchTerm(e.target.value)}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                  }}
                                  onKeyDown={(e) => e.stopPropagation()}
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
                            <SelectGroup className="overflow-y-auto max-h-[200px]">
                              {filteredCompanies().length > 0 ? (
                                filteredCompanies().map(({ name, id }) => (
                                  <SelectItem key={id} value={id}>
                                    {name}
                                  </SelectItem>
                                ))
                              ) : (
                                <div className="px-2 py-1 text-sm text-gray-500">
                                  No companies found
                                </div>
                              )}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <AddCompanyDrawer fetchCompanies={fnCompanies} />
                </div>
                {errors.company_id && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.company_id.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
                Detailed Requirements
              </label>
              <div className="rounded-lg overflow-hidden border border-gray-200">
                <Controller
                  name="requirements"
                  control={control}
                  render={({ field }) => (
                    <MDEditor
                      value={field.value}
                      onChange={field.onChange}
                      preview="edit"
                      hideToolbar={false}
                      style={{ 
                        backgroundColor: "white",
                        color: "black",
                      }}
                      textareaProps={{
                        placeholder: "Describe the role requirements, responsibilities, and qualifications in detail",
                      }}
                      className="custom-md-editor !border-0"
                    />
                  )}
                />
              </div>
              {errors.requirements && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.requirements.message}
                </p>
              )}
            </div>

            {errorCreateJob?.message && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="text-red-700">{errorCreateJob?.message}</p>
              </div>
            )}

            {/* {loadingCreateJob && (
              <div className="flex justify-center">
                <BarLoader width={"200px"} color="#2563eb" />
              </div>
            )} */}

            <div className="flex justify-end mt-6">
              <Button 
                type="submit" 
                variant="blue" 
                size="lg"
                disabled={loadingCreateJob || showSuccess}
                className={`relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-2 rounded-lg transform transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  (loadingCreateJob || showSuccess) ? 'cursor-not-allowed opacity-80' : ''
                } ${showSuccess ? 'bg-green-600' : ''}`}
              >
                <span className={`flex items-center justify-center transition-opacity ${loadingCreateJob || showSuccess ? 'opacity-0' : 'opacity-100'}`}>
                  Post Job
                </span>
                {loadingCreateJob && !showSuccess && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                )}
                {showSuccess && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;