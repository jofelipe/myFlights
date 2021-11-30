import { gql } from 'graphql-request';

export const GET_FLIGHTS = gql`
  query getFlights {
    flights {
      departureDate
      number
      departureAirport {
        unique
        name
        code
        country
        location {
          latitude
          longitude
        }
      }
      departureTime
      arrivalAirport {
        unique
        name
        code
        country
        location {
          latitude
          longitude
        }
      }
      arrivalTime
      company {
        code
        name
        country
      }
      airplane {
        name
        manufacturer {
          name
        }
        smallName
      }
      airplaneReg
      class
      seatType
      seatNumber
      duration
    }
  }
`;

export const GET_FLIGHTS_MAP = gql`
  query getFlightsMap {
    flights {
      departureAirport {
        name
        location {
          latitude
          longitude
        }
      }
      arrivalAirport {
        name
        location {
          latitude
          longitude
        }
      }
    }
  }
`;

export const GET_FLIGHTS_NUMBER = gql`
  query getFlightsNumber {
    flights {
      departureAirport {
        country
      }
      arrivalAirport {
        country
      }
    }
  }
`;

export const GET_FLIGHTS_DURATION = gql`
  query getFlightsDuration {
    flights {
      duration
    }
  }
`;

export const GET_FLIGHTS_AIRPORTS = gql`
  query getFlightsAirports {
    flights {
      departureAirport {
        unique
      }
      arrivalAirport {
        unique
      }
    }
  }
`;

export const GET_AIRPORT_BY_UNIQUE = gql`
  query getAirportByUnique($unique: Int!) {
    airport(where: { unique: $unique }) {
      name
      code
      country
      location {
        latitude
        longitude
      }
    }
  }
`;

export const GET_FLIGHTS_COMPANIES = gql`
  query getFlightsCompanies {
    flights {
      company {
        unique
      }
    }
  }
`;

export const GET_COMPANY_BY_UNIQUE = gql`
  query getCompanyByUnique($unique: Int!) {
    company(where: { unique: $unique }) {
      name
      code
      country
    }
  }
`;
