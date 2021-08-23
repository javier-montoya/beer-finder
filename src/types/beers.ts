export interface Measurement {
    value: number;
    unit: string;
}

interface Hop {
    add: string;
    amount: Measurement;
    attribute: string;
    name: string;
}

interface Malt {
    amount: Measurement;
    name: string;
}

interface MashTemp {
    duration: number;
    temp: Measurement;
}

export interface Beer {
    abv: number
    attenuation_level: number;
    boil_volume: Measurement;
    brewers_tips: string;
    contributed_by: string;
    description: string;
    ebc: number;
    first_brewed: string;
    food_pairing: string[];
    ibu: number;
    id: number;
    image_url: string;
    ingredients: { malt: Malt[], hops: Hop[], yeast: string }
    method: {
        fermentation: { temp: Measurement },
        mash_temp: MashTemp[],
        twist: string
    }
    name: string;
    ph: number;
    srm: number;
    tagline: string;
    target_fg: number;
    target_og: number;
    volume: Measurement;

}