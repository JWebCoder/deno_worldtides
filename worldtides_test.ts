import { Worldtides } from './mod.ts'
import {
  assert,
  assertEquals,
} from "https://deno.land/std@v0.57.0/testing/asserts.ts"
const { test, env } = Deno

const apikey = env.get('apikey')
if (!apikey) {
  throw new Error('missing api key')
}

const worldtides = new Worldtides({
  key: apikey
})

test("Get a list of stations in a 50km radius", async () => {
  const lat = 33.768321
  const lon = -118.195617
  const stationDistance = 50
  const result = await worldtides.request({
    lat,
    lon,
    stationDistance,
    stations: true,
  })
  assertEquals(result.status, 200)
  assertEquals(typeof result.callCount, 'number')
  assertEquals(result.requestLat, lat)
  assertEquals(result.requestLon, lon)
  assertEquals(result.stationDistance, stationDistance)
  assert(Array.isArray(result.stations))
  const station = result.stations[0]
  assertEquals(typeof station.id, 'string')
  assertEquals(typeof station.name, 'string')
  assertEquals(typeof station.lat, 'string')
  assertEquals(typeof station.lon, 'string')
  assertEquals(typeof station.timezone, 'string')
})

test("Get the tidal heights for the current date", async () => {
  const lat = 33.768321
  const lon = -118.195617
  const date = new Date()
  const result = await worldtides.request({
    lat,
    lon,
    heights: true,
    date,
  })
  assertEquals(result.status, 200)
  assertEquals(typeof result.copyright, 'string')
  assertEquals(typeof result.callCount, 'number')
  assertEquals(result.requestLat, lat)
  assertEquals(result.requestLon, lon)
  assertEquals(typeof result.responseLat, 'number')
  assertEquals(typeof result.responseLon, 'number')
  assertEquals(typeof result.atlas, 'string')
  assertEquals(typeof result.station, 'string')
  assert(Array.isArray(result.heights))
  const height = result.heights[0]
  assertEquals(typeof height.dt, 'number')
  assertEquals(typeof height.date, 'string')
  assertEquals(typeof height.height, 'number')
})

test("Get the tidal plot for the current date", async () => {
  const lat = 33.768321
  const lon = -118.195617
  const date = new Date()
  const result = await worldtides.request({
    lat,
    lon,
    heights: true,
    date,
    plot: true,
  })
  assertEquals(result.status, 200)
  assertEquals(typeof result.copyright, 'string')
  assertEquals(typeof result.callCount, 'number')
  assertEquals(result.requestLat, lat)
  assertEquals(result.requestLon, lon)
  assertEquals(typeof result.responseLat, 'number')
  assertEquals(typeof result.responseLon, 'number')
  assertEquals(typeof result.atlas, 'string')
  assertEquals(typeof result.station, 'string')
  assert(Array.isArray(result.heights))
  const height = result.heights[0]
  assertEquals(typeof height.dt, 'number')
  assertEquals(typeof height.date, 'string')
  assertEquals(typeof height.height, 'number')
  assertEquals(typeof result.plot, 'string')
})

test("Get the tidal extremes", async () => {
  const lat = 33.768321
  const lon = -118.195617
  const date = new Date()
  const result = await worldtides.request({
    lat,
    lon,
    extremes: true,
    date,
  })
  assertEquals(result.status, 200)
  assertEquals(typeof result.copyright, 'string')
  assertEquals(typeof result.callCount, 'number')
  assertEquals(result.requestLat, lat)
  assertEquals(result.requestLon, lon)
  assertEquals(typeof result.responseLat, 'number')
  assertEquals(typeof result.responseLon, 'number')
  assertEquals(typeof result.atlas, 'string')
  assertEquals(typeof result.station, 'string')
  assert(Array.isArray(result.extremes))
  const extreme = result.extremes[0]
  assertEquals(typeof extreme.dt, 'number')
  assertEquals(typeof extreme.date, 'string')
  assertEquals(typeof extreme.height, 'number')
  assertEquals(typeof extreme.type, 'string')
})

test("Get the tidal heights and extremes for a 7 day period", async () => {
  const lat = 33.768321
  const lon = -118.195617
  const date = new Date()
  const result = await worldtides.request({
    lat,
    lon,
    heights: true,
    extremes: true,
    date,
  })
  assertEquals(result.status, 200)
  assertEquals(typeof result.copyright, 'string')
  assertEquals(typeof result.callCount, 'number')
  assertEquals(result.requestLat, lat)
  assertEquals(result.requestLon, lon)
  assertEquals(typeof result.responseLat, 'number')
  assertEquals(typeof result.responseLon, 'number')
  assertEquals(typeof result.atlas, 'string')
  assertEquals(typeof result.station, 'string')
  const height = result.heights[0]
  assertEquals(typeof height.dt, 'number')
  assertEquals(typeof height.date, 'string')
  assertEquals(typeof height.height, 'number')
  assert(Array.isArray(result.extremes))
  const extreme = result.extremes[0]
  assertEquals(typeof extreme.dt, 'number')
  assertEquals(typeof extreme.date, 'string')
  assertEquals(typeof extreme.height, 'number')
  assertEquals(typeof extreme.type, 'string')
})

test("Get the tidal extremes referenced to LAT (=Lowest Astronomical Tide)", async () => {
  const lat = 33.768321
  const lon = -118.195617
  const datum = 'LAT'
  const result = await worldtides.request({
    lat,
    lon,
    datum,
    extremes: true,
  })
  assertEquals(result.status, 200)
  assertEquals(typeof result.copyright, 'string')
  assertEquals(typeof result.callCount, 'number')
  assertEquals(result.requestLat, lat)
  assertEquals(result.requestLon, lon)
  assertEquals(typeof result.responseLat, 'number')
  assertEquals(typeof result.responseLon, 'number')
  assertEquals(typeof result.atlas, 'string')
  assertEquals(typeof result.station, 'string')
  assertEquals(result.requestDatum, datum)
  assertEquals(typeof result.responseDatum, 'string')
  assert(Array.isArray(result.extremes))
  const extreme = result.extremes[0]
  assertEquals(typeof extreme.dt, 'number')
  assertEquals(typeof extreme.date, 'string')
  assertEquals(typeof extreme.height, 'number')
  assertEquals(typeof extreme.type, 'string')
})

test("Get the tidal extremes referenced to LAT (=Lowest Astronomical Tide) and the datums", async () => {
  const lat = 33.768321
  const lon = -118.195617
  const datum = 'LAT'
  const result = await worldtides.request({
    lat,
    lon,
    datum,
    datums: true,
    extremes: true,
  })
  assertEquals(result.status, 200)
  assertEquals(typeof result.copyright, 'string')
  assertEquals(typeof result.callCount, 'number')
  assertEquals(result.requestLat, lat)
  assertEquals(result.requestLon, lon)
  assertEquals(typeof result.responseLat, 'number')
  assertEquals(typeof result.responseLon, 'number')
  assertEquals(typeof result.atlas, 'string')
  assertEquals(typeof result.station, 'string')
  assertEquals(result.requestDatum, datum)
  assertEquals(typeof result.responseDatum, 'string')
  assert(Array.isArray(result.extremes))
  const extreme = result.extremes[0]
  assertEquals(typeof extreme.dt, 'number')
  assertEquals(typeof extreme.date, 'string')
  assertEquals(typeof extreme.height, 'number')
  assertEquals(typeof extreme.type, 'string')
  const datumEntry = result.datums[0]
  assertEquals(typeof datumEntry.name, 'string')
  assertEquals(typeof datumEntry.height, 'number')
})