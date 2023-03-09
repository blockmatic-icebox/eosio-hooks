import { useTransit } from "@blockmatic/eosio-hooks-transit";

export const TransitData = () => {
  const { login, logout, error, ...state } = useTransit();
  console.log("error in example", error, typeof error);
  return (
    <div style={{ paddingBottom: 100 }}>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <br />
      <button onClick={() => login({ providerIndex: 0 })}>Connect Token Pocket</button>
      <button onClick={() => login({ providerIndex: 1 })}>Connect Scatter</button>
      <button onClick={() => logout()}>Disconnect</button>

      <p>{error?.message}</p>
    </div>
  );
};
