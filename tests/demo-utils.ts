import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt } from "@graphprotocol/graph-ts"
import { value } from "../generated/demo/demo"

export function createvalueEvent(one: BigInt): value {
  let valueEvent = changetype<value>(newMockEvent())

  valueEvent.parameters = new Array()

  valueEvent.parameters.push(
    new ethereum.EventParam("one", ethereum.Value.fromUnsignedBigInt(one))
  )

  return valueEvent
}
