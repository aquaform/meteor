type BaseDataPoint = {
  id: number;
  name: string;
  coord: {
    lon: number;
    lat: number;
  };
  // TODO: why null and why string?
  online: string | null;
};

type BaseIndicatorData = {
  indicatorId: number;
  value: number;
  str_value: string | null;
  time: string;
  symbol_code: string;
  // TODO: types are broken fr fr
  // added name cuz it exists in points/id, but according to API
  // it shouldn't, and I made the types according to the API...
  name: string;
};

type DataPointHistory = BaseDataPoint & {
  data: BaseIndicatorData[];
  per_page: number;
  current_page: number;
  first_page_url: string;
  last_page_url: string;
  from: number;
  to: number;
  total: number;
  last_page: number;
};

type Point = BaseDataPoint & {
  current_values?: (BaseIndicatorData & {
    name: string;
    unit: string;
    desc: string;
  })[];
};

type IndicatorData = {
  id: number;
  name: string;
  unit: string;
  desc: string;
};

type Widget = {
  pointId: number;
  chartType: "line";
  indicators: string[];
  name: string;
  customIndicators: CustomIndicator[];
};

interface CustomIndicator {
  value: number;
  label: string;
}

type WeatherForecastType = {
  type: string;
  geometry: {
    coordinates: number[];
    type: string;
  };
  properties: {
    meta: {
      units: any;
      updated_at: string;
    };
    timeseries: MeasurementType[];
  };
};

type MeasurementType = {
  time: string;
  data: {
    instant: {
      details: {
        air_pressure_at_sea_level: number;
        air_temperature: number;
        cloud_area_fraction: number;
        cloud_area_fraction_high: number;
        cloud_area_fraction_low: number;
        cloud_area_fraction_medium: number;
        dew_point_temperature: number;
        fog_area_fraction: number;
        relative_humidity: number;
        ultraviolet_index_clear_sky: number;
        wind_from_direction: number;
        wind_speed: number;
      };
    };
    next_12_hours: {
      summary: MeasurementSummaryType;
    };
    next_6_hours: {
      summary: MeasurementSummaryType;
      details: {
        air_temperature_max: number;
        air_temperature_min: number;
        precipitation_amount: number;
      };
    };
    next_1_hours: {
      summary: MeasurementSummaryType;
      details: { precipitation_amount: number };
    };
  };
};

type MeasurementSummaryType = {
  symbol_code: string;
};
