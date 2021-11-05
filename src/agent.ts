import BigNumber from 'bignumber.js'
import { 
  Finding, 
  HandleTransaction, 
  TransactionEvent, 
  FindingSeverity, 
  FindingType,
  getJsonRpcUrl
} from 'forta-agent'

const TARGETFUNCTION = "function getFallbackOracle()"
const TARGETADDRESS = "0xA50ba011c48153De246E5192C8f9258A2ba79Ca9"

const handleTransaction: HandleTransaction = async (txEvent: TransactionEvent) => {
  const findings: Finding[] = [];

  // // filter the transaction input for function calls
  // const invocations = txEvent.filterFunction(
  //   TARGETFUNCTION,
  //   TARGETADDRESS
  // );

  // filter the transaction input for function calls
  const invocations = txEvent.filterFunction(
    TARGETFUNCTION
  );

  // fire alerts for each function call
  invocations.forEach((invocation) => {
    findings.push(
      Finding.fromObject({
        name: "getFallbackOracle",
        description: `getFallbackOracle Called`,
        alertId: "FORTA-100",
        severity: FindingSeverity.Info,
        type: FindingType.Info,
        metadata: {
          by: txEvent.from,
          from: invocation.args.from,
          to: invocation.args.to,
        },
      })
    );
  });

  return findings;
}


export default {
  handleTransaction
}