# google-translate-chain

*Translate a string into another language, then another, then another, then...*

<br>


<br>

## Installation

```sh
npm i -S arnaudjuracek/google-translate-chain
```

<br>

## Usage

### CLI 
```
stratum

Usage:
  stratum
  stratum -klr --log-level=debug
  stratum -lts --log=<path>
  stratum --with=<path>
  stratum --help
  stratum --version

Options:
  -h, --help              Show this screen.
  -k, --keys              Enable prev/next animations using arrow keys.
  -l, --leap              Enable leapmotion.
  -r, --reload            Enable livereloading of stratum.config.json.
  -t, --timer             Enable prev/next stack timer.
  -s, --sound             Enable OSC sound output.
  -v, --version           Print the current version.
  -w, --with=<path>       Open the stratum-viewer applet as its visualiser.
  
  --log=<path>            Pipe stdout to the specified log file.
  --log-level=<level>     Set the log level (default is 'info').
  
Log level:
  0, emergency            System is unusable.
  1, alert                Action must be taken immediately.
  2, critical             The system is in critical condition.
  3, error                Error condition.
  4, warning              Warning condition.
  5, notice               A normal but significant condition.
  6, info                 A purely informational message.
  7, debug                Messages to debug an application.
```

<br>

### Programmatic
- `stratum` : stratum main app
- [`stratum-assistant`](https://github.com/chevalvert/stratum-assistant) : stratum setup and mapping assistant
- [`stratum-hnode`](https://github.com/Hemisphere-Project/STRATUM) : leds UDP server + client
- [`stratum-viewer`](https://github.com/chevalvert/stratum-viewer) : alternative UDP client

## License
[MIT.](https://tldrlegal.com/license/mit-license)
