import fs from "fs";

/**
 * Finds the contract file in the specified build paths.
 * @param name - The name of the contract.
 * @param suffix - The suffix for the contract file.
 * @returns The path to the contract file.
 * @throws Will throw an error if the contract file is not found.
 */
function findContractFile(name: string, suffix: string): string {
  const BUILD_PATH = `./target/dev/contracts`;
  const MOCK_BUILD_PATH = `./target/dev/mocks`;

  const mainPath = `${BUILD_PATH}_${name}${suffix}`;
  const mockPath = `${MOCK_BUILD_PATH}_${name}${suffix}`;

  if (fs.existsSync(mainPath)) {
    return mainPath;
  } else if (fs.existsSync(mockPath)) {
    console.log(`Using mock contract for ${name} from ${mockPath}`);
    return mockPath;
  }

  throw new Error(
    `Contract file not found for ${name} with suffix ${suffix} in either ${BUILD_PATH} or ${MOCK_BUILD_PATH}`,
  );
}

/**
 * Retrieves and parses the compiled contract JSON.
 * @param name - The name of the contract.
 * @returns The parsed contract object.
 */
export function getCompiledContract(name: string): any {
  const contractPath = findContractFile(name, ".contract_class.json");
  return JSON.parse(fs.readFileSync(contractPath).toString("ascii"));
}

/**
 * Retrieves and parses the compiled contract CASM JSON.
 * @param name - The name of the contract.
 * @returns The parsed CASM contract object.
 */
export function getCompiledContractCasm(name: string): any {
  const contractPath = findContractFile(name, ".compiled_contract_class.json");
  return JSON.parse(fs.readFileSync(contractPath).toString("ascii"));
}
