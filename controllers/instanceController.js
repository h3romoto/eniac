import * as child_process from "node:child_process";
import * as util from "node:util";

const execAsync = util.promisify(child_process.exec);

const buildInstance = async () => {
  try {
    const resultPromise = execAsync("cd terraform; pwd; ls -al"); //terraform refresh; terraform plan; terraform apply -auto-approve
    const { childProcess } = resultPromise;
    const obj = await resultPromise;
    console.log(obj.stdout);
  } catch (error) {
    console.log(error);
  }
};

const connectInstance = async () => {
  try {
    console.log("Connecting to instance");
  } catch (error) {
    console.log(error);
  }
};

const destroyInstance = async () => {
  try {
    console.log("Deleting your instance")
  } catch (error) {
    console.log(error)
  }
}

export { buildInstance, connectInstance, destroyInstance }