const createJob = async (req, res) => {
  res.send("Create job");
};

const getAllJobs = async (req, res) => {
  res.send("Get all jobs");
};

const updateJob = async (req, res) => {
  res.send("Update job");
};

const deleteJob = async (req, res) => {
  res.send("Delete job");
};

const showStats = async (req, res) => {
  res.send("Show job stats");
};

export { createJob, getAllJobs, updateJob, deleteJob, showStats }
