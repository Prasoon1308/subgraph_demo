import { value as valueEvent } from "../generated/demo/demo"
import { value } from "../generated/schema"

export function handlevalue(event: valueEvent): void {
  let entity = new value(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.one = event.params.one

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
