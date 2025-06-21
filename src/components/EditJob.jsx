import { useParams } from "react-router-dom";
import { getJobById, updateJob } from "@/api/apiJobs";
import { getCompanies } from "@/api/apiCompanies";
import useFetch from "@/hooks/use-fetch";

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

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { BarLoader } from "react-spinners";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  requirements: z.string().min(1, { message: "Requirements are required" }),
  location: z.string().min(1, { message: "Location is required" }),
  company_id: z.string().or(z.number()).transform(val => String(val)).pipe(
    z.string().min(1, { message: "Company is required" })
  ),
});

const EditJob = () => {
  const { id } = useParams();
  const [companies, setCompanies] = useState([]);
  const [cities, setCities] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    data: jobData,
    loading: loadingJob,
    error: fetchJobError,
    fn: fetchJob,
  } = useFetch(getJobById, { requireAuth: false });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    console.log("Job ID from params:", id);
    if (id) {
      fetchJob(id);
    } else {
      console.error("Job ID is null or undefined");
    }
  }, [id]);

  useEffect(() => {
    if (jobData) {
      reset({
        title: jobData.title,
        description: jobData.description,
        requirements: jobData.requirements,
        location: jobData.location,
        company_id: String(jobData.company_id), // Ensure company_id is a string
      });
    }
  }, [jobData, reset]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getCompanies();
        setCompanies(data || []);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    const setCitiesList = () => {
      // Sort cities alphabetically
      const sortedCities = [...MAJOR_CANADIAN_CITIES].sort();
      setCities(sortedCities);
    };

    fetchCompanies();
    setCitiesList();
  }, []);

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      // Ensure company_id is a string
      const formData = {
        ...data,
        company_id: String(data.company_id)
      };
      const updatedJob = await updateJob({ id, ...formData });
      console.log("Job updated successfully:", updatedJob);
      setIsSubmitting(false);
      setShowSuccess(true);
      // Add a small delay before redirecting to show the success state
      setTimeout(() => {
        window.location.href = "/jobs";
      }, 1000);
    } catch (error) {
      console.error("Error updating job:", error);
      setIsSubmitting(false);
      alert("Failed to update job. Please try again.");
    }
  };

  if (loadingJob) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center ">
        <BarLoader width="200px" color="#2563eb" />
        <p className="text-gray-600 mt-4 animate-pulse">Loading job details...</p>
      </div>
    );
  }

  if (fetchJobError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center ">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <p className="text-red-700">Failed to load job data. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="gradient-title font-extrabold text-4xl sm:text-5xl mb-2">
            Edit Job Posting
          </h1>
          <p className="text-gray-600">Update your job listing details below</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10 transition-all duration-300 hover:shadow-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Job Title */}
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
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            {/* Job Description */}
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Job Description
              </label>
              <Textarea 
                id="description"
                placeholder="Provide a detailed description of the role"
                className="w-full min-h-[120px] transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                {...register("description")} 
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            {/* Requirements */}
            <div className="space-y-2">
              <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
                Job Requirements
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
                        placeholder: "List the requirements, qualifications, and skills needed",
                      }}
                      className="custom-md-editor !border-0"
                    />
                  )}
                />
              </div>
              {errors.requirements && (
                <p className="text-red-500 text-sm mt-1">{errors.requirements.message}</p>
              )}
            </div>

            {/* Location and Company Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <select
                  id="location"
                  {...register("location")}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                >
                  <option value="">Select Location</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="company_id" className="block text-sm font-medium text-gray-700">
                  Company
                </label>
                <select
                  id="company_id"
                  {...register("company_id")}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                >
                  <option value="">Select Company</option>
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </select>
                {errors.company_id && (
                  <p className="text-red-500 text-sm mt-1">{errors.company_id.message}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <Button 
                type="submit" 
                variant="blue"
                size="lg"
                disabled={isSubmitting || showSuccess}
                className={`relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-2 rounded-lg transform transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  (isSubmitting || showSuccess) ? 'cursor-not-allowed opacity-80' : ''
                } ${showSuccess ? 'bg-green-600' : ''}`}
              >
                <span className={`flex items-center justify-center transition-opacity ${isSubmitting || showSuccess ? 'opacity-0' : 'opacity-100'}`}>
                  Update Job
                </span>
                {isSubmitting && !showSuccess && (
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

export default EditJob;