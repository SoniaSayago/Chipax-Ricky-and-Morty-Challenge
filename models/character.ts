import {Location} from './Location';

export interface Character {
    id:       number;
    name:     string;
    origin:   Location;
    location: Location;
    image:    string;
    episode:  string[];
    url:      string;
    created:  Date;
}
