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