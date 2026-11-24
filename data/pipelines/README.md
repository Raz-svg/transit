# data/pipelines

Python scripts that build `data/gtfs/` from `data/geojson/` and `data/raw/`.

```sh
python -m venv .venv
.venv/Scripts/activate        # Windows; use .venv/bin/activate on macOS/Linux
pip install -r requirements.txt
```

Planned scripts (Sprint 1-2):

| Script                 | Does                                                     |
| ---------------------- | -------------------------------------------------------- |
| `traces_to_shapes.py`  | GPX/KML/GeoJSON tracks → `shapes.txt`                    |
| `cluster_stops.py`     | Boarding points → clustered virtual stops → `stops.txt`  |
| `build_frequencies.py` | Observed headways → `frequencies.txt`                    |
| `build_fares.py`       | Junction fare matrix → `fare_attributes.txt` / rules     |
| `package_feed.py`      | Zip the feed into `deploy/otp/` after validation         |

The legacy Dart GTFS parser (`legacy/trufi-core-flutter/packages/trufi_core_planner`)
is a useful reference for how the existing app read these files.
