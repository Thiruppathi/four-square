// All Front-End logic modules goes here.
import "../sass/style.scss";

import { $, $$ } from "./modules/bling";
import autocomplete from "./modules/autocomplete";

autocomplete($("#address"), $("#lat"), $("#lng"));
autocomplete($("#near"), $("#fromLat"), $("#fromLng"));
