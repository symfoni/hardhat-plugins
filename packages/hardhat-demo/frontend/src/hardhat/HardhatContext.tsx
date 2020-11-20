/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { providers, Signer, ethers } from "ethers";
import React, { useEffect, useState } from "react";
import Web3Modal, { IProviderOptions } from "web3modal";
import SimpleStorageDeployment from "./deployments/localhost/SimpleStorage.json";
import { SimpleStorage } from "./typechain/SimpleStorage";
import { SimpleStorage__factory } from "./typechain/factories/SimpleStorage__factory";

export const emptyContract = {
    instance: undefined,
    factory: undefined
};
export const defaultProvider: providers.Provider | undefined = undefined;
export const ProviderContext = React.createContext<[providers.Provider | undefined, React.Dispatch<React.SetStateAction<providers.Provider | undefined>>]>([defaultProvider, () => { }]);
export const defaultCurrentAddress: string = "";
export const CurrentAddressContext = React.createContext<[string, React.Dispatch<React.SetStateAction<string>>]>([defaultCurrentAddress, () => { }]);
export const defaultSigner: Signer | undefined = undefined;
export const SignerContext = React.createContext<[Signer | undefined, React.Dispatch<React.SetStateAction<Signer | undefined>>]>([defaultSigner, () => { }]);
export const SimpleStorageContext = React.createContext<SymfoniSimpleStorage>(emptyContract);

export interface HardhatContextProps {
    autoInit?: boolean;
    deferRender?: boolean;
}

export interface SymfoniSimpleStorage {
    instance?: SimpleStorage;
    factory?: SimpleStorage__factory;
}

export const HardhatContext: React.FC<HardhatContextProps> = ({
    deferRender = false,
    autoInit = true,
    ...props
}) => {
    const [initialized, setInitialized] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);
    const [/* providerName */, setProviderName] = useState<string>();
    const [signer, setSigner] = useState<Signer | undefined>(defaultSigner);
    const [provider, setProvider] = useState<providers.Provider | undefined>(defaultProvider);
    const [currentAddress, setCurrentAddress] = useState<string>(defaultCurrentAddress);
    const providerPriority = ["brreg", "web3modal", "hardhat"];
    const [SimpleStorage, setSimpleStorage] = useState<SymfoniSimpleStorage>(emptyContract);
    useEffect(() => {
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
                            return Promise.resolve(web3provider)
                        } catch (error) {
                            return Promise.resolve(undefined)
                        }
                    case "localhost":
                        try {
                            const provider = new ethers.providers.JsonRpcProvider({ // TODO make this param
                                url: "http://127.0.0.1:8545",
                            });
                            return Promise.resolve(provider)
                        } catch (error) {
                            return Promise.resolve(undefined)
                        } case "brreg":
                        try {
                            const provider = new ethers.providers.JsonRpcProvider({ // TODO make this param
                                url: "https://u1qdua80h5:Er0LWdZuKqOza22YNQKhtdFCbqRzhzGCRhuZgrtHZ9s@u1txh1ent0-u1ieecy018-rpc.us1-azure.kaleido.io",
                                user: "u1qdua80h5",
                                password: "Er0LWdZuKqOza22YNQKhtdFCbqRzhzGCRhuZgrtHZ9s"
                            });
                            return Promise.resolve(provider)
                        } catch (error) {
                            return Promise.resolve(undefined)
                        } case "brregStage":
                        try {
                            const provider = new ethers.providers.StaticJsonRpcProvider({ // TODO make this param
                                url: "https://u1qdua80h5:Er0LWdZuKqOza22YNQKhtdFCbqRzhzGCRhuZgrtHZ9s@u1txh1ent0-u1ieecy018-rpc.us1-azure.kaleido.io",
                                user: "u1qdua80h5",
                                password: "Er0LWdZuKqOza22YNQKhtdFCbqRzhzGCRhuZgrtHZ9s"
                            });
                            return Promise.resolve(provider)
                        } catch (error) {
                            return Promise.resolve(undefined)
                        } case "brregProd":
                        try {
                            const provider = new ethers.providers.JsonRpcProvider({ // TODO make this param
                                url: "https://u1qdua80h5:Er0LWdZuKqOza22YNQKhtdFCbqRzhzGCRhuZgrtHZ9s@u1txh1ent0-u1ieecy018-rpc.us1-azure.kaleido.io",
                                user: "u1qdua80h5",
                                password: "Er0LWdZuKqOza22YNQKhtdFCbqRzhzGCRhuZgrtHZ9s"
                            });
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
        const doAsync = async () => {
            setMessages(old => [...old, "Initiating Hardhat React"])
            const providerObject = await getProvider() // getProvider can actually return undefined, see issue https://github.com/microsoft/TypeScript/issues/11094

            if (!subscribed || !providerObject) return null
            const _provider = providerObject.provider
            const _providerName = _provider.constructor.name;
            setProvider(_provider)
            setProviderName(_providerName)
            setMessages(old => [...old, "Useing provider: " + _providerName])
            const _signer = await getSigner(_provider, providerObject.hardhatProviderName);

            if (!subscribed || !_signer) return null
            setSigner(_signer)
            const address = await _signer.getAddress()

            if (!subscribed || !address) return null
            setCurrentAddress(address)

            setSimpleStorage(getSimpleStorage(_provider, _signer))

            setInitialized(true)
        };
        doAsync();
        return () => { subscribed = false }
    }, [])

    const getSimpleStorage = (_provider: providers.Provider, _signer?: Signer) => {

        const contractAddress = SimpleStorageDeployment.receipt.contractAddress
        const instance = _signer ? SimpleStorage__factory.connect(contractAddress, _signer) : SimpleStorage__factory.connect(contractAddress, _provider)
        const contract: SymfoniSimpleStorage = {
            instance: instance,
            factory: _signer ? new SimpleStorage__factory(_signer) : undefined,
        }
        return contract
    };
    return (
        <ProviderContext.Provider value={[provider, setProvider]}>
            <SignerContext.Provider value={[signer, setSigner]}>
                <CurrentAddressContext.Provider value={[currentAddress, setCurrentAddress]}>
                    <SimpleStorageContext.Provider value={SimpleStorage}>
                        {initialized &&
                            (props.children)
                        }
                        {!initialized &&
                            <div>
                                {messages.map((msg, i) => (
                                    <p key={i}>{msg}</p>
                                ))}
                            </div>
                        }
                    </SimpleStorageContext.Provider >
                </CurrentAddressContext.Provider>
            </SignerContext.Provider>
        </ProviderContext.Provider>
    )
};
