import { useParams, useNavigate } from "react-router-dom";
import { getJobById, updateJob } from "@/api/apiJobs";
import { getCompanies } from "@/api/apiCompanies";
import { City } from "country-state-city";
import useFetch from "@/hooks/use-fetch";
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
  company_id: z.string().min(1, { message: "Company is required" }),
});

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [cities, setCities] = useState([]);

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
        company_id: jobData.company_id,
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

    fetchCompanies();
    setCities(City.getCitiesOfCountry("CA")); // Fetch Canadian cities
  }, []);

  const onSubmit = async (data) => {
    try {
      const updatedJob = await updateJob({ id, ...data });
      console.log("Job updated successfully:", updatedJob);
      navigate("/jobs"); // Redirect after successful update
    } catch (error) {
      console.error("Error updating job:", error);
      alert("Failed to update job. Please try again.");
    }
  };

  if (loadingJob) {
    return (
      <div>
        <BarLoader width="100%" color="#36d7b7" />
        <p>Loading job details...</p>
      </div>
    );
  }

  if (fetchJobError) {
    return <p className="text-red-500">Failed to load job data. Please try again.</p>;
  }

  return (
    <div className="container">
      <h1 className="gradient-title font-extrabold text-4xl text-center my-8">
        Edit Job Posting
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4">
        <Input placeholder="Job Title" {...register("title")} aria-label="Job Title" />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

        <Textarea placeholder="Job Description" {...register("description")} />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}

        <Controller
          name="requirements"
          control={control}
          render={({ field }) => (
            <MDEditor
              value={field.value}
              onChange={field.onChange}
              style={{ backgroundColor: "white", color: "black" }}
              textareaProps={{
                placeholder: "Please enter job requirements",
              }}
              className="custom-md-editor"
            />
          )}
        />
        {errors.requirements && (
          <p className="text-red-500">{errors.requirements.message}</p>
        )}

        <select
          {...register("location")}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Select Location</option>
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
        {errors.location && <p className="text-red-500">{errors.location.message}</p>}

        <select
          {...register("company_id")}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Select Company</option>
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
        {errors.company_id && <p className="text-red-500">{errors.company_id.message}</p>}

        <Button type="submit" variant="blue" size="lg" className="mt-4">
          Update Job
        </Button>
      </form>
    </div>
  );
};

export default EditJob;