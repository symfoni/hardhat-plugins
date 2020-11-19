import { debug } from "debug";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import {
  CodeBlockWriter,
  OptionalKind,
  SourceFile,
  SyntaxKind,
  VariableDeclarationKind,
  VariableDeclarationStructure,
} from "ts-morph";
import { ReactComponent } from "./ReactComponent";
import { ContractContext, contractInterfaceName } from "./TsMorhProject";
const log = debug("hardhat:plugin:react");

export class ReactContext {
  private sourceFile: SourceFile;
  private readonly args: any;
  private readonly hre: HardhatRuntimeEnvironment;
  private readonly contractContexts: ContractContext[];
  private reactComponent?: ReactComponent;
  private componentName = "HardhatContext";
  constructor(
    sourceFile: SourceFile,
    args: any,
    bre: HardhatRuntimeEnvironment,
    contractContext: ContractContext[]
  ) {
    this.hre = bre;
    this.args = args;
    this.sourceFile = sourceFile;
    this.contractContexts = contractContext;
  }

  async generate() {
    this.headers();
    this.imports();
    this.preComponentStatements();
    this.preComponentInterfaces();
    const reactComponent = this.createReactComponent();
    this.reactComponent = new ReactComponent(
      this.sourceFile,
      this.args,
      this.hre,
      this.contractContexts,
      reactComponent
    );
    this.reactComponent.generate();
    this.sourceFile.formatText();
  }

  private headers() {
    this.sourceFile.addStatements((writer) => {
      writer.write(
        `/* Autogenerated file. Do not edit manually. */
        /* tslint:disable */
        /* eslint-disable */`
      );
    });
  }
  private imports() {
    this.sourceFile.addImportDeclarations([
      {
        namedImports: ["providers", "Signer", "ethers"],
        moduleSpecifier: "ethers",
      },
      {
        namedImports: ["useEffect", "useState"],
        defaultImport: "React",
        moduleSpecifier: "react",
      },
      {
        namedImports: ["IProviderOptions"],
        defaultImport: "Web3Modal",
        moduleSpecifier: "web3modal",
      },
    ]);

    this.contractContexts.forEach((contract) => {
      if (contract.deploymentFile) {
        this.sourceFile.addImportDeclaration({
          defaultImport: `${contract.name}Deployment`,
          moduleSpecifier: "./" + contract.deploymentFile,
        });
      }
      this.sourceFile.addImportDeclarations([
        {
          namedImports: [`${contract.typechainInstanceName}`],
          moduleSpecifier:
            "./" + contract.typechainInstance.replace(".d.ts", ""),
        },
        {
          namedImports: [`${contract.typechainFactoryName}`],
          moduleSpecifier: "./" + contract.typechainFactory.replace(".ts", ""),
        },
        // REVIEW : Maybe import artifact files
        // {
        //   namedImports: [`${contract.name}Artifact`],
        //   moduleSpecifier: contract.artifactFile
        // }
      ]);
    });
  }

  private addConstExportedStatment(
    declaration: OptionalKind<VariableDeclarationStructure>
  ) {
    this.sourceFile.addVariableStatement({
      declarationKind: VariableDeclarationKind.Const,
      isExported: true,
      declarations: [declaration],
    });
  }
  private preComponentStatements() {
    this.addConstExportedStatment({
      name: "emptyContract",
      initializer: `{
          instance: undefined,
          factory: undefined
        }`,
    });
    this.addConstExportedStatment({
      name: "defaultProvider",
      type: "providers.Provider | undefined",
      initializer: "undefined",
    });
    this.addConstExportedStatment({
      name: "ProviderContext",
      initializer:
        "React.createContext<[providers.Provider | undefined, React.Dispatch<React.SetStateAction<providers.Provider | undefined>>]>([defaultProvider, () => { }])",
    });
    this.addConstExportedStatment({
      name: "defaultCurrentAddress",
      type: "string",
      initializer: `""`,
    });
    this.addConstExportedStatment({
      name: "CurrentAddressContext",
      initializer:
        "React.createContext<[string, React.Dispatch<React.SetStateAction<string>>]>([defaultCurrentAddress, () => { }])",
    });
    this.addConstExportedStatment({
      name: "defaultSigner",
      type: "Signer | undefined",
      initializer: "undefined",
    });
    this.addConstExportedStatment({
      name: "SignerContext",
      initializer:
        "React.createContext<[Signer | undefined, React.Dispatch<React.SetStateAction<Signer | undefined>>]>([defaultSigner, () => { }])",
    });

    this.contractContexts.forEach((contract) => {
      this.addConstExportedStatment({
        name: `${contract.name}Context`,
        initializer: `React.createContext<${contractInterfaceName(
          contract
        )}>(emptyContract)`,
      });
    });
  }

  private preComponentInterfaces() {
    this.sourceFile.addInterface({
      name: this.componentName + "Props",
      isExported: true,
      properties: [],
    });
    this.contractContexts.forEach((contract) => {
      this.sourceFile.addInterface({
        name: contractInterfaceName(contract),
        isExported: true,
        properties: [
          {
            name: "instance",
            type: `${contract.typechainInstanceName}`,
            hasQuestionToken: contract.deploymentFile ? true : true, // REVIEW If we can instantiate provider before component is generate we can maybe remove this
          },
          {
            name: "factory",
            type: `${contract.typechainFactoryName}`,
            hasQuestionToken: true,
          },
        ],
      });
    });
  }

  private createReactComponent() {
    this.sourceFile.addVariableStatement({
      declarationKind: VariableDeclarationKind.Const,
      isExported: true,
      declarations: [
        {
          name: this.componentName,
          type: `React.FC<${this.componentName + "Props"}>`,
          initializer: "(props) => {}",
        },
      ],
    });
    const hardhatContextComponent = this.sourceFile.getVariableDeclarationOrThrow(
      this.componentName
    );
    const reactComponent = hardhatContextComponent.getInitializerIfKindOrThrow(
      SyntaxKind.ArrowFunction
    );

    return reactComponent;
  }
}
