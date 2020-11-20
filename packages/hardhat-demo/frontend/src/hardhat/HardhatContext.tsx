/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { providers, Signer, ethers } from "ethers";
import React, { useEffect, useState } from "react";
import Web3Modal, { IProviderOptions } from "web3modal";
import SimpleStorageDeployment from "./deployments/localhost/SimpleStorage.json";
import { SimpleStorage } from "./typechain/SimpleStorage";
import { SimpleStorage__factory } from "./typechain/factories/SimpleStorage__factory";

const emptyContract = {
    instance: undefined,
    factory: undefined
};
const defaultProvider: providers.Provider | undefined = undefined;
export const ProviderContext = React.createContext<[providers.Provider | undefined, React.Dispatch<React.SetStateAction<providers.Provider | undefined>>]>([defaultProvider, () => { }]);
const defaultCurrentAddress: string = "";
export const CurrentAddressContext = React.createContext<[string, React.Dispatch<React.SetStateAction<string>>]>([defaultCurrentAddress, () => { }]);
const defaultSigner: Signer | undefined = undefined;
export const SignerContext = React.createContext<[Signer | undefined, React.Dispatch<React.SetStateAction<Signer | undefined>>]>([defaultSigner, () => { }]);
const defaultHardhatContext: HardhatContextInterface = {
    currentHardhatProvider: "",
    init: () => { throw Error("Hardhat context not initialized") },
    loading: false,
    messages: []
};
export const HardhatContext = React.createContext<HardhatContextInterface>(defaultHardhatContext);
export const SimpleStorageContext = React.createContext<SymfoniSimpleStorage>(emptyContract);

export interface HardhatContextInterface {
    init: (provider?: string) => void;
    loading: boolean;
    messages: string[];
    currentHardhatProvider: string;
}

export interface HardhatProps {
    autoInit?: boolean;
    showLoading?: boolean;
    loadingComponent?: React.ReactNode;
}

export interface SymfoniSimpleStorage {
    instance?: SimpleStorage;
    factory?: SimpleStorage__factory;
}

export const Hardhat: React.FC<HardhatProps> = ({
    showLoading = true,
    autoInit = false,
    ...props
}) => {
    const [initializeCounter, setInitializeCounter] = useState(0);
    const [currentHardhatProvider, setCurrentHardhatProvider] = useState("");
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);
    const [/* providerName */, setProviderName] = useState<string>();
    const [signer, setSigner] = useState<Signer | undefined>(defaultSigner);
    const [provider, setProvider] = useState<providers.Provider | undefined>(defaultProvider);
    const [currentAddress, setCurrentAddress] = useState<string>(defaultCurrentAddress);
    const [providerPriority, setProviderPriority] = useState<string[]>(["web3modal", "brreg", "hardhat"]);
    const [SimpleStorage, setSimpleStorage] = useState<SymfoniSimpleStorage>(emptyContract);
    useEffect(() => {
        if (messages.length > 0)
            console.debug(messages.pop())
    }, [messages])

    const getProvider = async (): Promise<{ provider: providers.Provider, hardhatProviderName: string } | undefined> => {
        let hardhatProviderName = "Not set";
        const provider = await providerPriority.reduce(async (maybeProvider: Promise<providers.Provider | undefined>, providerIdentification) => {
            let foundProvider = await maybeProvider
            if (foundProvider) {
                return Promise.resolve(foundProvider)
            }
            else {
                switch (providerIdentification.toLowerCase()) {
                    case "web3modal":
                        try {
                            const provider = await getWeb3ModalProvider()
                            const web3provider = new ethers.providers.Web3Provider(provider);
                            hardhatProviderName = "web3modal";
                            return Promise.resolve(web3provider)
                        } catch (error) {
                            return Promise.resolve(undefined)
                        }
                    case "localhost":
                        try {
                            const provider = new ethers.providers.JsonRpcProvider({
                                url: "http://127.0.0.1:8545",
                            });
                            hardhatProviderName = "localhost";
                            return Promise.resolve(provider)
                        } catch (error) {
                            return Promise.resolve(undefined)
                        } case "brreg":
                        try {
                            const provider = new ethers.providers.JsonRpcProvider({
                                url: "https://u1qdua80h5:Er0LWdZuKqOza22YNQKhtdFCbqRzhzGCRhuZgrtHZ9s@u1txh1ent0-u1ieecy018-rpc.us1-azure.kaleido.io",
                                user: "u1qdua80h5",
                                password: "Er0LWdZuKqOza22YNQKhtdFCbqRzhzGCRhuZgrtHZ9s"
                            });
                            hardhatProviderName = "brreg";
                            return Promise.resolve(provider)
                        } catch (error) {
                            return Promise.resolve(undefined)
                        } case "brregStage":
                        try {
                            const provider = new ethers.providers.StaticJsonRpcProvider({
                                url: "https://u1qdua80h5:Er0LWdZuKqOza22YNQKhtdFCbqRzhzGCRhuZgrtHZ9s@u1txh1ent0-u1ieecy018-rpc.us1-azure.kaleido.io",
                                user: "u1qdua80h5",
                                password: "Er0LWdZuKqOza22YNQKhtdFCbqRzhzGCRhuZgrtHZ9s"
                            });
                            hardhatProviderName = "brregStage";
                            return Promise.resolve(provider)
                        } catch (error) {
                            return Promise.resolve(undefined)
                        } case "brregProd":
                        try {
                            const provider = new ethers.providers.JsonRpcProvider({
                                url: "https://u1qdua80h5:Er0LWdZuKqOza22YNQKhtdFCbqRzhzGCRhuZgrtHZ9s@u1txh1ent0-u1ieecy018-rpc.us1-azure.kaleido.io",
                                user: "u1qdua80h5",
                                password: "Er0LWdZuKqOza22YNQKhtdFCbqRzhzGCRhuZgrtHZ9s"
                            });
                            hardhatProviderName = "brregProd";
                            return Promise.resolve(provider)
                        } catch (error) {
                            return Promise.resolve(undefined)
                        } default:
                        return Promise.resolve(undefined)
                }
            }
        }, Promise.resolve(undefined)) // end reduce
        return provider ? { provider, hardhatProviderName } : undefined
    };
    const getSigner = async (_provider: providers.Provider, hardhatProviderName: string): Promise<Signer | undefined> => {
        switch (_provider.constructor.name) {
            case "Web3Provider":
                const web3provider = _provider as ethers.providers.Web3Provider
                return await web3provider.getSigner()
            case "JsonRpcProvider":
                switch (hardhatProviderName) {
                    case "hardhat":
                        return ethers.Wallet.fromMnemonic("shrug antique orange tragic direct drop abstract ring carry price anchor train").connect(_provider)
                    case "brreg":
                        return ethers.Wallet.fromMnemonic("shrug antique orange tragic direct drop abstract ring carry price anchor train").connect(_provider)
                    default:
                        return undefined
                }
            case "StaticJsonRpcProvider":
                switch (hardhatProviderName) {
                    case "brregStage":
                        return ethers.Wallet.fromMnemonic("shrug antique orange tragic direct drop abstract ring carry price anchor train").connect(_provider)
                    default:
                        return undefined
                }
            default:
                return undefined
        }
    };
    const getWeb3ModalProvider = async (): Promise<any> => {
        const providerOptions: IProviderOptions = {};
        const web3Modal = new Web3Modal({
            // network: "mainnet",
            cacheProvider: true,
            providerOptions, // required
        });
        return await web3Modal.connect();
    };

    useEffect(() => {
        let subscribed = true
        const finish = (text: string) => {
            setLoading(false)
            setMessages(old => [...old, text])
        }
        const doAsync = async () => {
            if (!autoInit && initializeCounter === 0) return finish("Auto init turned off.")
            setLoading(true)
            setMessages(old => [...old, "Initiating Hardhat React"])
            const providerObject = await getProvider() // getProvider can actually return undefined, see issue https://github.com/microsoft/TypeScript/issues/11094

            if (!subscribed || !providerObject) return finish("No provider or signer.")
            const _provider = providerObject.provider
            const _providerName = _provider.constructor.name;
            setProvider(_provider)
            setProviderName(_providerName)
            setMessages(old => [...old, "Useing provider: " + _providerName])
            setCurrentHardhatProvider(providerObject.hardhatProviderName)
            const _signer = await getSigner(_provider, providerObject.hardhatProviderName);

            if (!subscribed || !_signer) return finish("Provider, without signer.")
            setSigner(_signer)
            setMessages(old => [...old, "Useing signer"])
            const address = await _signer.getAddress()

            if (!subscribed || !address) return finish("Provider and signer, without address.")
            setCurrentAddress(address)

            setSimpleStorage(getSimpleStorage(_provider, _signer))

            return finish("Completed Hardhat context initialization.")
        };
        doAsync();
        return () => { subscribed = false }
    }, [initializeCounter])

    const getSimpleStorage = (_provider: providers.Provider, _signer?: Signer) => {

        const contractAddress = SimpleStorageDeployment.receipt.contractAddress
        const instance = _signer ? SimpleStorage__factory.connect(contractAddress, _signer) : SimpleStorage__factory.connect(contractAddress, _provider)
        const contract: SymfoniSimpleStorage = {
            instance: instance,
            factory: _signer ? new SimpleStorage__factory(_signer) : undefined,
        }
        return contract
    }
        ;

    const handleInitProvider = (provider?: string) => {
        if (provider) {
            setProviderPriority(old => old.sort((a, b) => {
                return a === provider ? -1 : b === provider ? 1 : 0;
            }))
        }
        setInitializeCounter(old => old++)
    }
    return (
        <HardhatContext.Provider value={{ init: handleInitProvider, currentHardhatProvider, loading, messages }}>
            <ProviderContext.Provider value={[provider, setProvider]}>
                <SignerContext.Provider value={[signer, setSigner]}>
                    <CurrentAddressContext.Provider value={[currentAddress, setCurrentAddress]}>
                        <SimpleStorageContext.Provider value={SimpleStorage}>
                            {initializeCounter === 0 && showLoading && loading ?
                                <div>
                                    {messages.map((msg, i) => (
                                        <p key={i}>{msg}</p>
                                    ))}
                                </div>
                                : props.children
                            }
                        </SimpleStorageContext.Provider >
                    </CurrentAddressContext.Provider>
                </SignerContext.Provider>
            </ProviderContext.Provider>
        </HardhatContext.Provider>
    )
};
