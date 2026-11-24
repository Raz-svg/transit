# websocket/

Sprint 3 (Contributor 3): the `/api/v1/live` broker. Speaks the `ClientMessage` /
`ServerMessage` unions from `@transit/shared-types`; fans out `vehicle.position`
and `stand.status` updates, with Redis pub/sub between server instances.
