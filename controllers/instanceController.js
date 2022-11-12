import * as child_process from "node:child_process";
import * as util from "node:util";

const execAsync = util.promisify(child_process.exec);

const buildInstance = async (req,res) => {
  try {
    const resultPromise = execAsync("cd terraform; pwd; ls -al"); //terraform refresh; terraform plan; terraform apply -auto-approve
    const { childProcess } = resultPromise;
    const obj = await resultPromise;
    res.send(obj.stdout);
  } catch (error) {
    res.send(error);
  }
};

const connectInstance = async (req,res) => {
  res.send("Connecting to instance");
};

const updateInstance = async (req,res) => {
  res.send("Update Instance");
};

const destroyInstance = async (req,res) => {
  res.send("Deleting your instance");
};

const showInstanceStats = async (req,res) => {
  res.send("Getting stats");
};

export { buildInstance, connectInstance, destroyInstance, showInstanceStats, updateInstance };
