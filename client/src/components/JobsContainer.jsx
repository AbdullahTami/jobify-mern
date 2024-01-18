import Wrapper from "../assets/wrappers/JobsContainer";
import { useAllJobsContext } from "../pages/AllJobs";
import Job from "./Job";

function JobsContainer() {
  const { data } = useAllJobsContext();
  const { data: jobs } = data;
  console.log(jobs);

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} job={job} />;
        })}
      </div>
    </Wrapper>
  );
}

export default JobsContainer;
