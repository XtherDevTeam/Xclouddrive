import { createTheme } from '@mui/material';
import imgBackground3 from './assets/background-3.png'

import imgOops from './assets/oops.jpg'
import loginBackground from './assets/loginBackground.jpg'

let darkTheme = {
  "breakpoints": {
    "keys": [
      "xs",
      "sm",
      "md",
      "lg",
      "xl"
    ],
    "values": {
      "xs": 0,
      "sm": 600,
      "md": 900,
      "lg": 1200,
      "xl": 1536
    },
    "unit": "px"
  },
  "direction": "ltr",
  "components": {
    "MuiCssBaseline": {
      "defaultProps": {
        "enableColorScheme": true
      },
      "styleOverrides": {
        "*::-webkit-scrollbar": {
          "display": "none"
        }
      }
    },
    "MuiAccordion": {
      "styleOverrides": {
        "root": {
          "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
          "border": "0px solid #4c444c",
          "color": "#e8e0e5",
          "backgroundColor": "#3c383b",
          "&:before": {
            "backgroundColor": "#3c383b",
            "display": "none"
          },
          "&.Mui-disabled": {
            "backgroundColor": "#332f33",
            "color": "#e8e0e5",
            "border": "0px solid #4c444c"
          },
          "& .MuiAccordionSummary-root > .MuiAccordionSummary-expandIconWrapper ": {
            "color": "#e8e0e5"
          }
        }
      }
    },
    "MuiAlert": {
      "defaultProps": {
        "variant": "standard"
      },
      "styleOverrides": {
        "root": {
          "borderRadius": "20px"
        },
        "standardError": {
          "background": "#93000a",
          "color": "#ffdad6"
        },
        "standardInfo": {
          "background": "#00468c",
          "color": "#d6e3ff"
        },
        "standardWarning": {
          "background": "#703800",
          "color": "#ffdcc5"
        },
        "standardSuccess": {
          "background": "#005231",
          "color": "#92f7bc"
        },
        "filledError": {
          "background": "#ffb4ab",
          "color": "#690005"
        },
        "filledInfo": {
          "background": "#a9c7ff",
          "color": "#003063"
        },
        "filledWarning": {
          "background": "#ffb782",
          "color": "#4f2500"
        },
        "filledSuccess": {
          "background": "#76daa1",
          "color": "#003920"
        },
        "outlinedError": {
          "color": "#ffb4ab"
        },
        "outlinedInfo": {
          "color": "#a9c7ff"
        },
        "outlinedWarning": {
          "color": "#ffb782"
        },
        "outlinedSuccess": {
          "color": "#76daa1"
        }
      }
    },
    "MuiAppBar": {
      "defaultProps": {
        "elevation": 0,
        "color": "default"
      },
      "styleOverrides": {
        "colorDefault": {
          "background": "#221f22",
          "color": "#e8e0e5"
        },
        "colorPrimary": {
          "background": "#151215",
          "color": "#e8e0e5"
        }
      }
    },
    "MuiBadge": {
      "defaultProps": {
        "color": "default"
      },
      "variants": [
        {
          "props": {
            "color": "default"
          },
          "style": {
            ".MuiBadge-badge": {
              "backgroundColor": "#ffb4ab",
              "color": "#690005"
            }
          }
        }
      ]
    },
    "MuiButton": {
      "styleOverrides": {
        "root": {
          "borderRadius": "30px",
          "textTransform": "none",
          "fontWeight": "bold",
          "&:has(>svg)": {
            "padding": "8px",
            "borderRadius": "50%",
            "minWidth": "1em",
            "minHeight": "1em"
          }
        }
      },
      "variants": [
        {
          "props": {
            "variant": "elevated"
          },
          "style": {
            "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
            "backgroundColor": "#1e1b1e",
            "color": "#f1afff",
            "&:hover": {
              "background": "#2d272d",
              "boxShadow": "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "background": "#342d35"
            },
            "&:active": {
              "background": "#342d35"
            },
            "&.Mui-disabled": {
              "backgroundColor": "rgba(232, 224, 229, 0.12)",
              "color": "rgba(232, 224, 229, 0.38)",
              "boxShadow": "none"
            }
          }
        },
        {
          "props": {
            "variant": "filled"
          },
          "style": {
            "backgroundColor": "#f1afff",
            "color": "#53036b",
            "boxShadow": "none",
            "&.Mui-disabled": {
              "backgroundColor": "rgba(232, 224, 229, 0.12)",
              "color": "rgba(232, 224, 229, 0.38)",
              "boxShadow": "none"
            },
            "&:hover": {
              "backgroundColor": "#e3a1f1",
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "backgroundColor": "#db9aea",
              "boxShadow": "none"
            },
            "&:active": {
              "backgroundColor": "#db9aea",
              "boxShadow": "none"
            }
          }
        },
        {
          "props": {
            "variant": "tonal"
          },
          "style": {
            "backgroundColor": "#514154",
            "color": "#f2dbf3",
            "boxShadow": "none",
            "&.Mui-disabled": {
              "backgroundColor": "rgba(232, 224, 229, 0.12)",
              "color": "rgba(232, 224, 229, 0.38)",
              "boxShadow": "none"
            },
            "&:hover": {
              "backgroundColor": "#5c4c5f",
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "backgroundColor": "#625165",
              "boxShadow": "none"
            },
            "&:active": {
              "backgroundColor": "#625165",
              "boxShadow": "none"
            }
          }
        },
        {
          "props": {
            "variant": "outlined"
          },
          "style": {
            "color": "#f1afff",
            "borderColor": "#988e97",
            "borderWidth": "1px",
            "boxShadow": "none",
            "&.Mui-disabled": {
              "borderColor": "rgba(232, 224, 229, 0.12)",
              "color": "rgba(232, 224, 229, 0.38)"
            },
            "&:hover": {
              "backgroundColor": "#251f25",
              "borderColor": "#9e919e"
            },
            "&:focus": {
              "backgroundColor": "#2d262d",
              "borderColor": "#f1afff"
            },
            "&:active": {
              "backgroundColor": "#2d262d",
              "borderColor": "#a193a1"
            }
          }
        },
        {
          "props": {
            "variant": "text"
          },
          "style": {
            "backgroundColor": "transparent",
            "color": "#f1afff",
            "boxShadow": "none",
            "padding": "5px 15px",
            "&.Mui-disabled": {
              "color": "rgba(232, 224, 229, 0.38)"
            },
            "&:hover": {
              "backgroundColor": "#251f25"
            },
            "&:focus": {
              "backgroundColor": "#2d262d"
            },
            "&:active": {
              "backgroundColor": "#2d262d"
            }
          }
        }
      ]
    },
    "MuiCard": {
      "styleOverrides": {
        "root": {
          "borderRadius": "20px",
          "padding": "10px 6px"
        }
      },
      "variants": [
        {
          "props": {
            "variant": "elevation"
          },
          "style": {
            "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
            "backgroundColor": "#1e1b1e",
            "transition": "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            "&:hover": {
              "background": "#2d272d",
              "boxShadow": "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
              "background": "#342d35"
            },
            "&:active": {
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
              "background": "#342d35"
            },
            "&.Mui-disabled": {
              "backgroundColor": "rgba(30, 27, 30, 0.38)",
              "color": "#4c444c",
              "boxShadow": "none"
            }
          }
        },
        {
          "props": {
            "variant": "filled"
          },
          "style": {
            "boxShadow": "none",
            "backgroundColor": "#383437",
            "transition": "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            "&:hover": {
              "background": "#443e44",
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "boxShadow": "none",
              "background": "#4b434a"
            },
            "&:active": {
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
              "background": "#4b434a"
            },
            "&.Mui-disabled": {
              "backgroundColor": "rgba(56, 52, 55, 0.38)",
              "color": "#4c444c",
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)"
            }
          }
        },
        {
          "props": {
            "variant": "outlined"
          },
          "style": {
            "boxShadow": "none",
            "backgroundColor": "#151215",
            "borderColor": "#988e97",
            "transition": "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            "&:hover": {
              "background": "#251f25",
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "boxShadow": "none",
              "background": "#2d262d"
            },
            "&:active": {
              "boxShadow": "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
              "background": "#4b434a"
            },
            "&.Mui-disabled": {
              "borderColor": "rgba(56, 52, 55, 0.12)",
              "boxShadow": "none"
            }
          }
        }
      ]
    },
    "MuiDrawer": {
      "styleOverrides": {
        "paper": {
          "border": "0px",
          "background": "#221f22",
          "color": "#cfc3cd"
        }
      }
    },
    "MuiFab": {
      "defaultProps": {
        "color": "secondary"
      },
      "styleOverrides": {
        "root": {
          "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
          "borderRadius": "18px"
        }
      },
      "variants": [
        {
          "props": {
            "color": "primary"
          },
          "style": {
            "backgroundColor": "#6d2583",
            "color": "#fbd7ff",
            "&:hover": {
              "background": "#77358b",
              "boxShadow": "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "background": "#7c3c8f",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            },
            "&:active": {
              "background": "#7c3c8f",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            }
          }
        },
        {
          "props": {
            "color": "secondary"
          },
          "style": {
            "backgroundColor": "#514154",
            "color": "#f2dbf3",
            "&:hover": {
              "background": "#5c4c5f",
              "boxShadow": "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "background": "#625165",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            },
            "&:active": {
              "background": "#625165",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            }
          }
        },
        {
          "props": {
            "color": "surface"
          },
          "style": {
            "backgroundColor": "#221f22",
            "color": "#f1afff",
            "&:hover": {
              "background": "#302b31",
              "boxShadow": "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "background": "#373138",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            },
            "&:active": {
              "background": "#373138",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            }
          }
        },
        {
          "props": {
            "color": "tertiary"
          },
          "style": {
            "backgroundColor": "#663b37",
            "color": "#ffdad6",
            "&:hover": {
              "background": "#714642",
              "boxShadow": "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "background": "#774c47",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            },
            "&:active": {
              "background": "#774c47",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            }
          }
        }
      ]
    },
    "MuiListItem": {
      "styleOverrides": {
        "root": {
          "paddingTop": 1,
          "paddingBottom": 1,
          "& .MuiListItemButton-root": {
            "paddingTop": 8,
            "paddingBottom": 8
          }
        }
      }
    },
    "MuiListItemButton": {
      "styleOverrides": {
        "root": {
          "borderRadius": 50,
          "color": "#cfc3cd",
          "&:hover": {
            "backgroundColor": "#2d292d",
            "color": "#d1c5cf"
          },
          "&:active": {
            "backgroundColor": "#353035",
            "color": "#d2c6d0"
          },
          "&.Mui-selected": {
            "color": "#f2dbf3",
            "background": "#514154",
            "& > .MuiListItemText-root > .MuiTypography-root": {
              "fontWeight": "bold"
            },
            "&:hover": {
              "backgroundColor": "#5c4c5f",
              "color": "#e3cce4"
            },
            "&:active": {
              "backgroundColor": "#625165",
              "color": "#dbc5dc"
            }
          }
        }
      }
    },
    "MuiListItemIcon": {
      "styleOverrides": {
        "root": {
          "color": "inherit",
          "minWidth": 32,
          "&.Mui-selected": {
            "fontWeight": "bold"
          }
        }
      }
    },
    "MuiMenu": {
      "defaultProps": {
        "color": "default"
      },
      "styleOverrides": {
        "root": {},
        "paper": {
          "backgroundColor": "#1e1b1e",
          "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
          "color": "#e8e0e5"
        }
      }
    },
    "MuiSwitch": {
      "styleOverrides": {
        "root": {
          "width": 42,
          "height": 26,
          "padding": 0,
          "marginLeft": 12,
          "marginRight": 8,
          "borderColor": "#988e97",
          "& .MuiSwitch-switchBase": {
            "padding": 0,
            "margin": 7,
            "transitionDuration": "100ms",
            "&.Mui-checked": {
              "transform": "translateX(16px)",
              "margin": 4,
              "& + .MuiSwitch-track": {
                "backgroundColor": "#f1afff",
                "opacity": 1,
                "border": 0,
                height: 24
              },
              "& .MuiSwitch-thumb": {
                "color": "#53036b",
                "width": 18,
                "height": 18
              },
              "&.Mui-disabled + .MuiSwitch-track": {
                "backgroundColor": "rgba(232, 224, 229, 0.1)"
              },
              "&.Mui-disabled .MuiSwitch-thumb": {
                "color": "rgba(21, 18, 21, 0.8)"
              }
            },
            "&.Mui-focusVisible .MuiSwitch-thumb": {
              "color": "#f1afff",
              "border": "6px solid #53036b"
            },
            "&.Mui-disabled .MuiSwitch-thumb": {
              "color": "rgba(232, 224, 229, 0.3)"
            }
          },
          "& .MuiSwitch-thumb": {
            "boxSizing": "border-box",
            "color": "#988e97",
            "width": 12,
            "height": 12,
            "&:before": {
              "content": "''",
              "position": "absolute",
              "width": "100%",
              "height": "100%",
              "left": 0,
              "top": 0,
              "backgroundRepeat": "no-repeat",
              "backgroundPosition": "center"
            }
          },
          "& .MuiSwitch-track": {
            "borderRadius": 20,
            "border": "2px solid #988e97",
            "backgroundColor": "#383437",
            "opacity": 1,
            "transition": "background .2s",
            height: 22
          }
        }
      }
    },
    "MuiToggleButton": {
      "styleOverrides": {
        "root": {
          "borderRadius": "50px",
          "textTransform": "none",
          "color": "#e8e0e5",
          "&.Mui-selected": {
            "color": "#f2dbf3",
            "backgroundColor": "#514154"
          },
          "&.MuiToggleButton-primary": {
            "borderColor": "transparent"
          },
          "&.MuiToggleButton-primary.Mui-selected": {
            "color": "#53036b",
            "backgroundColor": "#f1afff"
          }
        }
      }
    },
    "MuiToggleButtonGroup": {
      "styleOverrides": {
        "grouped": {
          "borderRadius": "50px",
          "borderColor": "#988e97",
          "&:not(:first-of-type)": {
            "marginLeft": 0,
            "borderLeft": 0
          },
          "&:hover": {
            "background": "#251f25"
          },
          "&.Mui-selected:hover": {
            "background": "#5c4c5f"
          }
        }
      }
    },
    "MuiTooltip": {
      "styleOverrides": {
        "tooltip": {
          "background": "#e8e0e5",
          "color": "#332f33"
        }
      }
    }
  },
  "palette": {
    "mode": "light",
    "themeMode": "dark",
    "primary": {
      "main": "#f1afff",
      "contrastText": "#53036b",
      "light": "rgb(243, 191, 255)",
      "dark": "rgb(168, 122, 178)"
    },
    "onPrimary": {
      "main": "#53036b",
      "contrastText": "#f1afff"
    },
    "primaryContainer": {
      "main": "#6d2583",
      "contrastText": "#fbd7ff"
    },
    "onPrimaryContainer": {
      "main": "#fbd7ff",
      "contrastText": "#6d2583"
    },
    "secondary": {
      "main": "#d6c0d6",
      "contrastText": "#3a2b3d",
      "light": "rgb(222, 204, 222)",
      "dark": "rgb(149, 134, 149)"
    },
    "onSecondary": {
      "main": "#3a2b3d",
      "contrastText": "#d6c0d6"
    },
    "secondaryContainer": {
      "main": "#514154",
      "contrastText": "#f2dbf3"
    },
    "onSecondaryContainer": {
      "main": "#f2dbf3",
      "contrastText": "#514154"
    },
    "tertiary": {
      "main": "#f5b7b2",
      "contrastText": "#4c2522"
    },
    "onTertiary": {
      "main": "#4c2522",
      "contrastText": "#f5b7b2"
    },
    "tertiaryContainer": {
      "main": "#663b37",
      "contrastText": "#ffdad6"
    },
    "onTertiaryContainer": {
      "main": "#ffdad6",
      "contrastText": "#663b37"
    },
    "error": {
      "main": "#ffb4ab",
      "contrastText": "#690005",
      "light": "rgb(255, 195, 187)",
      "dark": "rgb(178, 125, 119)"
    },
    "onError": {
      "main": "#690005",
      "contrastText": "#ffb4ab"
    },
    "errorContainer": {
      "main": "#93000a",
      "contrastText": "#ffdad6"
    },
    "onErrorContainer": {
      "main": "#ffdad6",
      "contrastText": "#93000a"
    },
    "primaryFixed": {
      "main": "#fbd7ff"
    },
    "primaryFixedDim": {
      "main": "#f1afff"
    },
    "onPrimaryFixed": {
      "main": "#330044"
    },
    "onPrimaryFixedVariant": {
      "main": "#6d2583"
    },
    "secondaryFixed": {
      "main": "#f2dbf3"
    },
    "secondaryFixedDim": {
      "main": "#d6c0d6"
    },
    "onSecondaryFixed": {
      "main": "#241727"
    },
    "onSecondaryFixedVariant": {
      "main": "#514154"
    },
    "tertiaryFixed": {
      "main": "#ffdad6"
    },
    "tertiaryFixedDim": {
      "main": "#f5b7b2"
    },
    "onTertiaryFixed": {
      "main": "#33110f"
    },
    "onTertiaryFixedVariant": {
      "main": "#663b37"
    },
    "surface": {
      "main": "#151215",
      "contrastText": "#e8e0e5"
    },
    "onSurface": {
      "main": "#e8e0e5",
      "contrastText": "#151215"
    },
    "surfaceDim": {
      "main": "#151215"
    },
    "surfaceBright": {
      "main": "#3c383b"
    },
    "surfaceContainerLowest": {
      "main": "#100d10"
    },
    "surfaceContainerLow": {
      "main": "#1e1b1e"
    },
    "surfaceContainer": {
      "main": "#221f22"
    },
    "surfaceContainerHigh": {
      "main": "#2d292c"
    },
    "surfaceContainerHighest": {
      "main": "#383437"
    },
    "surfaceVariant": {
      "main": "#4c444c",
      "contrastText": "#cfc3cd"
    },
    "onSurfaceVariant": {
      "main": "#cfc3cd",
      "contrastText": "#4c444c"
    },
    "outline": {
      "main": "#988e97"
    },
    "outlineVariant": {
      "main": "#4c444c"
    },
    "inversePrimary": {
      "main": "#883f9d",
      "contrastText": ""
    },
    "inverseOnPrimary": {
      "main": "",
      "contrastText": "#883f9d"
    },
    "inverseSurface": {
      "main": "#e8e0e5",
      "contrastText": "#e8e0e5"
    },
    "inverseOnSurface": {
      "main": "#332f33",
      "contrastText": "#e8e0e5"
    },
    "shadow": {
      "main": "#000000"
    },
    "scrim": {
      "main": "#000000"
    },
    "surfaceTintColor": {
      "main": "#f1afff"
    },
    "background": {
      "default": "#221f22",
      "paper": "#151215"
    },
    "onBackground": {
      "main": "#e8e0e5"
    },
    "common": {
      "white": "#151215",
      "black": "#e8e0e5"
    },
    "text": {
      "primary": "#e8e0e5",
      "secondary": "#f2dbf3",
      "disabled": "rgba(0, 0, 0, 0.38)"
    },
    "info": {
      "main": "#a9c7ff",
      "contrastText": "#003063",
      "light": "rgb(186, 210, 255)",
      "dark": "rgb(118, 139, 178)"
    },
    "onInfo": {
      "main": "#003063",
      "contrastText": "#a9c7ff"
    },
    "infoContainer": {
      "main": "#00468c",
      "contrastText": "#d6e3ff"
    },
    "onInfoContainer": {
      "main": "#d6e3ff",
      "contrastText": "#00468c"
    },
    "success": {
      "main": "#76daa1",
      "contrastText": "#003920",
      "light": "rgb(145, 225, 179)",
      "dark": "rgb(82, 152, 112)"
    },
    "onSuccess": {
      "main": "#003920",
      "contrastText": "#76daa1"
    },
    "successContainer": {
      "main": "#005231",
      "contrastText": "#92f7bc"
    },
    "onSuccessContainer": {
      "main": "#92f7bc",
      "contrastText": "#005231"
    },
    "warning": {
      "main": "#ffb782",
      "contrastText": "#4f2500",
      "light": "rgb(255, 197, 155)",
      "dark": "rgb(178, 128, 91)"
    },
    "onWarning": {
      "main": "#4f2500",
      "contrastText": "#ffb782"
    },
    "warningContainer": {
      "main": "#703800",
      "contrastText": "#ffdcc5"
    },
    "onWarningContainer": {
      "main": "#ffdcc5",
      "contrastText": "#703800"
    },
    "divider": "#988e97",
    "grey": {
      "50": "#fafafa",
      "100": "#f5f5f5",
      "200": "#eeeeee",
      "300": "#e0e0e0",
      "400": "#bdbdbd",
      "500": "#9e9e9e",
      "600": "#757575",
      "700": "#616161",
      "800": "#424242",
      "900": "#212121",
      "A100": "#f5f5f5",
      "A200": "#eeeeee",
      "A400": "#bdbdbd",
      "A700": "#616161"
    },
    "contrastThreshold": 3,
    "tonalOffset": 0.2,
    "action": {
      "active": "rgba(0, 0, 0, 0.54)",
      "hover": "rgba(0, 0, 0, 0.04)",
      "hoverOpacity": 0.04,
      "selected": "rgba(0, 0, 0, 0.08)",
      "selectedOpacity": 0.08,
      "disabled": "rgba(0, 0, 0, 0.26)",
      "disabledBackground": "rgba(0, 0, 0, 0.12)",
      "disabledOpacity": 0.38,
      "focus": "rgba(0, 0, 0, 0.12)",
      "focusOpacity": 0.12,
      "activatedOpacity": 0.12
    }
  },
  "shape": {
    "borderRadius": 4
  },
  "tones": {
    "primary": {
      "0": "#000000",
      "4": "#1e0029",
      "6": "#260033",
      "10": "#330044",
      "12": "#3a004c",
      "17": "#4a0060",
      "20": "#53036b",
      "22": "#580c70",
      "24": "#5d1374",
      "30": "#6d2583",
      "40": "#883f9d",
      "50": "#a359b9",
      "60": "#bf73d4",
      "70": "#dc8df1",
      "80": "#f1afff",
      "87": "#f8cbff",
      "90": "#fbd7ff",
      "92": "#fddfff",
      "94": "#ffe6ff",
      "95": "#ffebfe",
      "96": "#ffeffd",
      "98": "#fff7fb",
      "99": "#fffbff",
      "100": "#ffffff"
    },
    "secondary": {
      "0": "#000000",
      "4": "#160919",
      "6": "#1b0f1e",
      "10": "#241727",
      "12": "#281b2b",
      "17": "#332536",
      "20": "#3a2b3d",
      "22": "#3f3041",
      "24": "#433446",
      "30": "#514154",
      "40": "#6a596c",
      "50": "#847185",
      "60": "#9e8ba0",
      "70": "#b9a5bb",
      "80": "#d6c0d6",
      "87": "#ead3ea",
      "90": "#f2dbf3",
      "92": "#f8e1f8",
      "94": "#fee7fe",
      "95": "#ffebfe",
      "96": "#ffeffd",
      "98": "#fff7fb",
      "99": "#fffbff",
      "100": "#ffffff"
    },
    "tertiary": {
      "0": "#000000",
      "4": "#220504",
      "6": "#280907",
      "10": "#33110f",
      "12": "#381512",
      "17": "#441f1c",
      "20": "#4c2522",
      "22": "#512926",
      "24": "#572e2a",
      "30": "#663b37",
      "40": "#82524e",
      "50": "#9d6a65",
      "60": "#ba837e",
      "70": "#d79d97",
      "80": "#f5b7b2",
      "87": "#ffcfca",
      "90": "#ffdad6",
      "92": "#ffe2de",
      "94": "#ffe9e7",
      "95": "#ffedeb",
      "96": "#fff0ef",
      "98": "#fff8f7",
      "99": "#fffbff",
      "100": "#ffffff"
    },
    "neutral": {
      "0": "#000000",
      "4": "#100d10",
      "6": "#151215",
      "10": "#1e1b1e",
      "12": "#221f22",
      "17": "#2d292c",
      "20": "#332f33",
      "22": "#383437",
      "24": "#3c383b",
      "30": "#4a4549",
      "40": "#625d61",
      "50": "#7b7579",
      "60": "#958f93",
      "70": "#b0a9ad",
      "80": "#ccc4c9",
      "87": "#e0d8dc",
      "90": "#e8e0e5",
      "92": "#eee6ea",
      "94": "#f4ecf0",
      "95": "#f7eef3",
      "96": "#faf1f6",
      "98": "#fff7fb",
      "99": "#fffbff",
      "100": "#ffffff"
    },
    "neutralVariant": {
      "0": "#000000",
      "4": "#120c13",
      "6": "#171118",
      "10": "#201921",
      "12": "#241d25",
      "17": "#2f282f",
      "20": "#352e36",
      "22": "#3a323a",
      "24": "#3e373f",
      "30": "#4c444c",
      "40": "#645c64",
      "50": "#7e747d",
      "60": "#988e97",
      "70": "#b3a8b2",
      "80": "#cfc3cd",
      "87": "#e3d6e1",
      "90": "#ecdfe9",
      "92": "#f1e4ef",
      "94": "#f7eaf4",
      "95": "#faedf7",
      "96": "#fdf0fa",
      "98": "#fff7fb",
      "99": "#fffbff",
      "100": "#ffffff"
    },
    "error": {
      "0": "#000000",
      "4": "#280001",
      "6": "#310001",
      "10": "#410002",
      "12": "#490002",
      "17": "#5c0004",
      "20": "#690005",
      "22": "#710005",
      "24": "#790006",
      "30": "#93000a",
      "40": "#ba1a1a",
      "50": "#de3730",
      "60": "#ff5449",
      "70": "#ff897d",
      "80": "#ffb4ab",
      "87": "#ffcfc9",
      "90": "#ffdad6",
      "92": "#ffe2de",
      "94": "#ffe9e6",
      "95": "#ffedea",
      "96": "#fff0ee",
      "98": "#fff8f7",
      "99": "#fffbff",
      "100": "#ffffff"
    }
  },
  "unstable_sxConfig": {
    "border": {
      "themeKey": "borders"
    },
    "borderTop": {
      "themeKey": "borders"
    },
    "borderRight": {
      "themeKey": "borders"
    },
    "borderBottom": {
      "themeKey": "borders"
    },
    "borderLeft": {
      "themeKey": "borders"
    },
    "borderColor": {
      "themeKey": "palette"
    },
    "borderTopColor": {
      "themeKey": "palette"
    },
    "borderRightColor": {
      "themeKey": "palette"
    },
    "borderBottomColor": {
      "themeKey": "palette"
    },
    "borderLeftColor": {
      "themeKey": "palette"
    },
    "borderRadius": {
      "themeKey": "shape.borderRadius"
    },
    "color": {
      "themeKey": "palette"
    },
    "bgcolor": {
      "themeKey": "palette",
      "cssProperty": "backgroundColor"
    },
    "backgroundColor": {
      "themeKey": "palette"
    },
    "p": {},
    "pt": {},
    "pr": {},
    "pb": {},
    "pl": {},
    "px": {},
    "py": {},
    "padding": {},
    "paddingTop": {},
    "paddingRight": {},
    "paddingBottom": {},
    "paddingLeft": {},
    "paddingX": {},
    "paddingY": {},
    "paddingInline": {},
    "paddingInlineStart": {},
    "paddingInlineEnd": {},
    "paddingBlock": {},
    "paddingBlockStart": {},
    "paddingBlockEnd": {},
    "m": {},
    "mt": {},
    "mr": {},
    "mb": {},
    "ml": {},
    "mx": {},
    "my": {},
    "margin": {},
    "marginTop": {},
    "marginRight": {},
    "marginBottom": {},
    "marginLeft": {},
    "marginX": {},
    "marginY": {},
    "marginInline": {},
    "marginInlineStart": {},
    "marginInlineEnd": {},
    "marginBlock": {},
    "marginBlockStart": {},
    "marginBlockEnd": {},
    "displayPrint": {
      "cssProperty": false
    },
    "display": {},
    "overflow": {},
    "textOverflow": {},
    "visibility": {},
    "whiteSpace": {},
    "flexBasis": {},
    "flexDirection": {},
    "flexWrap": {},
    "justifyContent": {},
    "alignItems": {},
    "alignContent": {},
    "order": {},
    "flex": {},
    "flexGrow": {},
    "flexShrink": {},
    "alignSelf": {},
    "justifyItems": {},
    "justifySelf": {},
    "gap": {},
    "rowGap": {},
    "columnGap": {},
    "gridColumn": {},
    "gridRow": {},
    "gridAutoFlow": {},
    "gridAutoColumns": {},
    "gridAutoRows": {},
    "gridTemplateColumns": {},
    "gridTemplateRows": {},
    "gridTemplateAreas": {},
    "gridArea": {},
    "position": {},
    "zIndex": {
      "themeKey": "zIndex"
    },
    "top": {},
    "right": {},
    "bottom": {},
    "left": {},
    "boxShadow": {
      "themeKey": "shadows"
    },
    "width": {},
    "maxWidth": {},
    "minWidth": {},
    "height": {},
    "maxHeight": {},
    "minHeight": {},
    "boxSizing": {},
    "fontFamily": {
      "themeKey": "typography"
    },
    "fontSize": {
      "themeKey": "typography"
    },
    "fontStyle": {
      "themeKey": "typography"
    },
    "fontWeight": {
      "themeKey": "typography"
    },
    "letterSpacing": {},
    "textTransform": {},
    "lineHeight": {},
    "textAlign": {},
    "typography": {
      "cssProperty": false,
      "themeKey": "typography"
    }
  },
  "mixins": {
    "toolbar": {
      "minHeight": 56,
      "@media (min-width:0px)": {
        "@media (orientation: landscape)": {
          "minHeight": 48
        }
      },
      "@media (min-width:600px)": {
        "minHeight": 64
      }
    }
  },
  "shadows": [
    "none",
    "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
    "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
    "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
    "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
    "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
    "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)",
    "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
    "0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)",
    "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
    "0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)",
    "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)",
    "0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)",
    "0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)",
    "0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)",
    "0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)",
    "0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)",
    "0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)",
    "0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)",
    "0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)",
    "0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)",
    "0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)",
    "0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)",
    "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)"
  ],
  "typography": {
    "htmlFontSize": 16,
    "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500,
    "fontWeightBold": 700,
    "h1": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 300,
      "fontSize": "6rem",
      "lineHeight": 1.167,
      "letterSpacing": "-0.01562em"
    },
    "h2": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 300,
      "fontSize": "3.75rem",
      "lineHeight": 1.2,
      "letterSpacing": "-0.00833em"
    },
    "h3": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "3rem",
      "lineHeight": 1.167,
      "letterSpacing": "0em"
    },
    "h4": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "2.125rem",
      "lineHeight": 1.235,
      "letterSpacing": "0.00735em"
    },
    "h5": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "1.5rem",
      "lineHeight": 1.334,
      "letterSpacing": "0em"
    },
    "h6": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 500,
      "fontSize": "1.25rem",
      "lineHeight": 1.6,
      "letterSpacing": "0.0075em"
    },
    "subtitle1": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "1rem",
      "lineHeight": 1.75,
      "letterSpacing": "0.00938em"
    },
    "subtitle2": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 500,
      "fontSize": "0.875rem",
      "lineHeight": 1.57,
      "letterSpacing": "0.00714em"
    },
    "body1": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "1rem",
      "lineHeight": 1.5,
      "letterSpacing": "0.00938em"
    },
    "body2": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "0.875rem",
      "lineHeight": 1.43,
      "letterSpacing": "0.01071em"
    },
    "button": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 500,
      "fontSize": "0.875rem",
      "lineHeight": 1.75,
      "letterSpacing": "0.02857em",
      "textTransform": "uppercase"
    },
    "caption": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "0.75rem",
      "lineHeight": 1.66,
      "letterSpacing": "0.03333em"
    },
    "overline": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "0.75rem",
      "lineHeight": 2.66,
      "letterSpacing": "0.08333em",
      "textTransform": "uppercase"
    },
    "inherit": {
      "fontFamily": "inherit",
      "fontWeight": "inherit",
      "fontSize": "inherit",
      "lineHeight": "inherit",
      "letterSpacing": "inherit"
    }
  },
  "transitions": {
    "easing": {
      "easeInOut": "cubic-bezier(0.4, 0, 0.2, 1)",
      "easeOut": "cubic-bezier(0.0, 0, 0.2, 1)",
      "easeIn": "cubic-bezier(0.4, 0, 1, 1)",
      "sharp": "cubic-bezier(0.4, 0, 0.6, 1)"
    },
    "duration": {
      "shortest": 150,
      "shorter": 200,
      "short": 250,
      "standard": 300,
      "complex": 375,
      "enteringScreen": 225,
      "leavingScreen": 195
    }
  },
  "zIndex": {
    "mobileStepper": 1000,
    "fab": 1050,
    "speedDial": 1050,
    "appBar": 1100,
    "drawer": 1200,
    "modal": 1300,
    "snackbar": 1400,
    "tooltip": 1500
  }
}

let lightTheme = {
  "breakpoints": {
    "keys": [
      "xs",
      "sm",
      "md",
      "lg",
      "xl"
    ],
    "values": {
      "xs": 0,
      "sm": 600,
      "md": 900,
      "lg": 1200,
      "xl": 1536
    },
    "unit": "px"
  },
  "direction": "ltr",
  "components": {
    "MuiCssBaseline": {
      "defaultProps": {
        "enableColorScheme": true
      },
      "styleOverrides": {
        "*::-webkit-scrollbar": {
          "display": "none"
        }
      }
    },
    "MuiAccordion": {
      "styleOverrides": {
        "root": {
          "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
          "border": "0px solid #cfc3cd",
          "color": "#1e1b1e",
          "backgroundColor": "#fff7fb",
          "&:before": {
            "backgroundColor": "#fff7fb",
            "display": "none"
          },
          "&.Mui-disabled": {
            "backgroundColor": "#f7eef3",
            "color": "#332f33",
            "border": "0px solid #cfc3cd"
          },
          "& .MuiAccordionSummary-root > .MuiAccordionSummary-expandIconWrapper ": {
            "color": "#1e1b1e"
          }
        }
      }
    },
    "MuiAlert": {
      "defaultProps": {
        "variant": "standard"
      },
      "styleOverrides": {
        "root": {
          "borderRadius": "20px"
        },
        "standardError": {
          "background": "#ffdad6",
          "color": "#410002"
        },
        "standardInfo": {
          "background": "#d6e3ff",
          "color": "#001b3d"
        },
        "standardWarning": {
          "background": "#ffdcc5",
          "color": "#301400"
        },
        "standardSuccess": {
          "background": "#92f7bc",
          "color": "#002111"
        },
        "filledError": {
          "background": "#ba1a1a",
          "color": "#ffffff"
        },
        "filledInfo": {
          "background": "#125db2",
          "color": "#ffffff"
        },
        "filledWarning": {
          "background": "#934b00",
          "color": "#ffffff"
        },
        "filledSuccess": {
          "background": "#006d43",
          "color": "#ffffff"
        },
        "outlinedError": {
          "color": "#ba1a1a"
        },
        "outlinedInfo": {
          "color": "#125db2"
        },
        "outlinedWarning": {
          "color": "#934b00"
        },
        "outlinedSuccess": {
          "color": "#006d43"
        }
      }
    },
    "MuiAppBar": {
      "defaultProps": {
        "elevation": 0,
        "color": "default"
      },
      "styleOverrides": {
        "colorDefault": {
          "background": "#f4ecf0",
          "color": "#1e1b1e"
        },
        "colorPrimary": {
          "background": "#fff7fb",
          "color": "#1e1b1e"
        }
      }
    },
    "MuiBadge": {
      "defaultProps": {
        "color": "default"
      },
      "variants": [
        {
          "props": {
            "color": "default"
          },
          "style": {
            ".MuiBadge-badge": {
              "backgroundColor": "#ba1a1a",
              "color": "#ffffff"
            }
          }
        }
      ]
    },
    "MuiButton": {
      "styleOverrides": {
        "root": {
          "borderRadius": "30px",
          "textTransform": "none",
          "fontWeight": "bold",
          "&:has(>svg)": {
            "padding": "8px",
            "borderRadius": "50%",
            "minWidth": "1em",
            "minHeight": "1em"
          }
        }
      },
      "variants": [
        {
          "props": {
            "variant": "elevated"
          },
          "style": {
            "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
            "backgroundColor": "#faf1f6",
            "color": "#883f9d",
            "&:hover": {
              "background": "#eee2eb",
              "boxShadow": "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "background": "#e8dae6"
            },
            "&:active": {
              "background": "#e8dae6"
            },
            "&.Mui-disabled": {
              "backgroundColor": "rgba(30, 27, 30, 0.12)",
              "color": "rgba(30, 27, 30, 0.38)",
              "boxShadow": "none"
            }
          }
        },
        {
          "props": {
            "variant": "filled"
          },
          "style": {
            "backgroundColor": "#883f9d",
            "color": "#ffffff",
            "boxShadow": "none",
            "&.Mui-disabled": {
              "backgroundColor": "rgba(30, 27, 30, 0.12)",
              "color": "rgba(30, 27, 30, 0.38)",
              "boxShadow": "none"
            },
            "&:hover": {
              "backgroundColor": "#8f50a1",
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "backgroundColor": "#9358a3",
              "boxShadow": "none"
            },
            "&:active": {
              "backgroundColor": "#9358a3",
              "boxShadow": "none"
            }
          }
        },
        {
          "props": {
            "variant": "tonal"
          },
          "style": {
            "backgroundColor": "#f2dbf3",
            "color": "#241727",
            "boxShadow": "none",
            "&.Mui-disabled": {
              "backgroundColor": "rgba(30, 27, 30, 0.12)",
              "color": "rgba(30, 27, 30, 0.38)",
              "boxShadow": "none"
            },
            "&:hover": {
              "backgroundColor": "#dec8df",
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "backgroundColor": "#d4bed5",
              "boxShadow": "none"
            },
            "&:active": {
              "backgroundColor": "#d4bed5",
              "boxShadow": "none"
            }
          }
        },
        {
          "props": {
            "variant": "outlined"
          },
          "style": {
            "color": "#883f9d",
            "borderColor": "#7e747d",
            "borderWidth": "1px",
            "boxShadow": "none",
            "&.Mui-disabled": {
              "borderColor": "rgba(30, 27, 30, 0.12)",
              "color": "rgba(30, 27, 30, 0.38)"
            },
            "&:hover": {
              "backgroundColor": "#f2e7f0",
              "borderColor": "#7e717e"
            },
            "&:focus": {
              "backgroundColor": "#ecdfea",
              "borderColor": "#883f9d"
            },
            "&:active": {
              "backgroundColor": "#ecdfea",
              "borderColor": "#7e707f"
            }
          }
        },
        {
          "props": {
            "variant": "text"
          },
          "style": {
            "backgroundColor": "transparent",
            "color": "#883f9d",
            "boxShadow": "none",
            "padding": "5px 15px",
            "&.Mui-disabled": {
              "color": "rgba(30, 27, 30, 0.38)"
            },
            "&:hover": {
              "backgroundColor": "#f2e7f0"
            },
            "&:focus": {
              "backgroundColor": "#ecdfea"
            },
            "&:active": {
              "backgroundColor": "#ecdfea"
            }
          }
        }
      ]
    },
    "MuiCard": {
      "styleOverrides": {
        "root": {
          "borderRadius": "20px",
          "padding": "10px 6px"
        }
      },
      "variants": [
        {
          "props": {
            "variant": "elevation"
          },
          "style": {
            "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
            "backgroundColor": "#faf1f6",
            "transition": "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            "&:hover": {
              "background": "#eee2eb",
              "boxShadow": "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
              "background": "#e8dae6"
            },
            "&:active": {
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
              "background": "#e8dae6"
            },
            "&.Mui-disabled": {
              "backgroundColor": "rgba(250, 241, 246, 0.38)",
              "color": "#ecdfe9",
              "boxShadow": "none"
            }
          }
        },
        {
          "props": {
            "variant": "filled"
          },
          "style": {
            "boxShadow": "none",
            "backgroundColor": "#e8e0e5",
            "transition": "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            "&:hover": {
              "background": "#ded3dc",
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "boxShadow": "none",
              "background": "#d9ccd8"
            },
            "&:active": {
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
              "background": "#d9ccd8"
            },
            "&.Mui-disabled": {
              "backgroundColor": "rgba(232, 224, 229, 0.38)",
              "color": "#ecdfe9",
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)"
            }
          }
        },
        {
          "props": {
            "variant": "outlined"
          },
          "style": {
            "boxShadow": "none",
            "backgroundColor": "#fff7fb",
            "borderColor": "#7e747d",
            "transition": "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            "&:hover": {
              "background": "#f2e7f0",
              "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "boxShadow": "none",
              "background": "#ecdfea"
            },
            "&:active": {
              "boxShadow": "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
              "background": "#d9ccd8"
            },
            "&.Mui-disabled": {
              "borderColor": "rgba(232, 224, 229, 0.12)",
              "boxShadow": "none"
            }
          }
        }
      ]
    },
    "MuiDrawer": {
      "styleOverrides": {
        "paper": {
          "border": "0px",
          "background": "#f4ecf0",
          "color": "#4c444c"
        }
      }
    },
    "MuiFab": {
      "defaultProps": {
        "color": "secondary"
      },
      "styleOverrides": {
        "root": {
          "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
          "borderRadius": "18px"
        }
      },
      "variants": [
        {
          "props": {
            "color": "primary"
          },
          "style": {
            "backgroundColor": "#fbd7ff",
            "color": "#330044",
            "&:hover": {
              "background": "#e8c3ed",
              "boxShadow": "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "background": "#deb9e4",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            },
            "&:active": {
              "background": "#deb9e4",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            }
          }
        },
        {
          "props": {
            "color": "secondary"
          },
          "style": {
            "backgroundColor": "#f2dbf3",
            "color": "#241727",
            "&:hover": {
              "background": "#dec8df",
              "boxShadow": "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "background": "#d4bed5",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            },
            "&:active": {
              "background": "#d4bed5",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            }
          }
        },
        {
          "props": {
            "color": "surface"
          },
          "style": {
            "backgroundColor": "#f4ecf0",
            "color": "#883f9d",
            "&:hover": {
              "background": "#e9dde6",
              "boxShadow": "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "background": "#e3d6e1",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            },
            "&:active": {
              "background": "#e3d6e1",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            }
          }
        },
        {
          "props": {
            "color": "tertiary"
          },
          "style": {
            "backgroundColor": "#ffdad6",
            "color": "#33110f",
            "&:hover": {
              "background": "#ecc6c2",
              "boxShadow": "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
            },
            "&:focus": {
              "background": "#e3bdb9",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            },
            "&:active": {
              "background": "#e3bdb9",
              "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
            }
          }
        }
      ]
    },
    "MuiListItem": {
      "styleOverrides": {
        "root": {
          "paddingTop": 1,
          "paddingBottom": 1,
          "& .MuiListItemButton-root": {
            "paddingTop": 8,
            "paddingBottom": 8
          }
        }
      }
    },
    "MuiListItemButton": {
      "styleOverrides": {
        "root": {
          "borderRadius": 50,
          "color": "#4c444c",
          "&:hover": {
            "backgroundColor": "#e4dbe0",
            "color": "#484148"
          },
          "&:active": {
            "backgroundColor": "#dad0d7",
            "color": "#463f46"
          },
          "&.Mui-selected": {
            "color": "#241727",
            "background": "#f2dbf3",
            "& > .MuiListItemText-root > .MuiTypography-root": {
              "fontWeight": "bold"
            },
            "&:hover": {
              "backgroundColor": "#dec8df",
              "color": "#332536"
            },
            "&:active": {
              "backgroundColor": "#d4bed5",
              "color": "#3b2c3e"
            }
          }
        }
      }
    },
    "MuiListItemIcon": {
      "styleOverrides": {
        "root": {
          "color": "inherit",
          "minWidth": 32,
          "&.Mui-selected": {
            "fontWeight": "bold"
          }
        }
      }
    },
    "MuiMenu": {
      "defaultProps": {
        "color": "default"
      },
      "styleOverrides": {
        "root": {},
        "paper": {
          "backgroundColor": "#faf1f6",
          "boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
          "color": "#1e1b1e"
        }
      }
    },
    "MuiSwitch": {
      "styleOverrides": {
        "root": {
          "width": 42,
          "height": 26,
          "padding": 0,
          "marginLeft": 12,
          "marginRight": 8,
          "borderColor": "#7e747d",
          "& .MuiSwitch-switchBase": {
            "padding": 0,
            "margin": 7,
            "transitionDuration": "100ms",
            "&.Mui-checked": {
              "transform": "translateX(16px)",
              "margin": 4,
              "& + .MuiSwitch-track": {
                "backgroundColor": "#883f9d",
                "opacity": 1,
                "border": 0,
                height: 24
              },
              "& .MuiSwitch-thumb": {
                "color": "#ffffff",
                "width": 18,
                "height": 18
              },
              "&.Mui-disabled + .MuiSwitch-track": {
                "backgroundColor": "rgba(30, 27, 30, 0.1)"
              },
              "&.Mui-disabled .MuiSwitch-thumb": {
                "color": "rgba(255, 247, 251, 0.8)"
              }
            },
            "&.Mui-focusVisible .MuiSwitch-thumb": {
              "color": "#883f9d",
              "border": "6px solid #ffffff"
            },
            "&.Mui-disabled .MuiSwitch-thumb": {
              "color": "rgba(30, 27, 30, 0.3)"
            }
          },
          "& .MuiSwitch-thumb": {
            "boxSizing": "border-box",
            "color": "#7e747d",
            "width": 12,
            "height": 12,
            "&:before": {
              "content": "''",
              "position": "absolute",
              "width": "100%",
              "height": "100%",
              "left": 0,
              "top": 0,
              "backgroundRepeat": "no-repeat",
              "backgroundPosition": "center"
            }
          },
          "& .MuiSwitch-track": {
            "borderRadius": 20,
            "border": "2px solid #7e747d",
            "backgroundColor": "#e8e0e5",
            "opacity": 1,
            "transition": "background .2s",
            height: 22
          }
        }
      }
    },
    "MuiToggleButton": {
      "styleOverrides": {
        "root": {
          "borderRadius": "50px",
          "textTransform": "none",
          "color": "#1e1b1e",
          "&.Mui-selected": {
            "color": "#241727",
            "backgroundColor": "#f2dbf3"
          },
          "&.MuiToggleButton-primary": {
            "borderColor": "transparent"
          },
          "&.MuiToggleButton-primary.Mui-selected": {
            "color": "#ffffff",
            "backgroundColor": "#883f9d"
          }
        }
      }
    },
    "MuiToggleButtonGroup": {
      "styleOverrides": {
        "grouped": {
          "borderRadius": "50px",
          "borderColor": "#7e747d",
          "&:not(:first-of-type)": {
            "marginLeft": 0,
            "borderLeft": 0
          },
          "&:hover": {
            "background": "#f2e7f0"
          },
          "&.Mui-selected:hover": {
            "background": "#dec8df"
          }
        }
      }
    },
    "MuiTooltip": {
      "styleOverrides": {
        "tooltip": {
          "background": "#332f33",
          "color": "#f7eef3"
        }
      }
    }
  },
  "palette": {
    "mode": "light",
    "themeMode": "light",
    "primary": {
      "main": "#883f9d",
      "contrastText": "#ffffff",
      "light": "rgb(159, 101, 176)",
      "dark": "rgb(95, 44, 109)"
    },
    "onPrimary": {
      "main": "#ffffff",
      "contrastText": "#883f9d"
    },
    "primaryContainer": {
      "main": "#fbd7ff",
      "contrastText": "#330044"
    },
    "onPrimaryContainer": {
      "main": "#330044",
      "contrastText": "#fbd7ff"
    },
    "secondary": {
      "main": "#6a596c",
      "contrastText": "#ffffff",
      "light": "rgb(135, 122, 137)",
      "dark": "rgb(74, 62, 75)"
    },
    "onSecondary": {
      "main": "#ffffff",
      "contrastText": "#6a596c"
    },
    "secondaryContainer": {
      "main": "#f2dbf3",
      "contrastText": "#241727"
    },
    "onSecondaryContainer": {
      "main": "#241727",
      "contrastText": "#f2dbf3"
    },
    "tertiary": {
      "main": "#82524e",
      "contrastText": "#ffffff"
    },
    "onTertiary": {
      "main": "#ffffff",
      "contrastText": "#82524e"
    },
    "tertiaryContainer": {
      "main": "#ffdad6",
      "contrastText": "#33110f"
    },
    "onTertiaryContainer": {
      "main": "#33110f",
      "contrastText": "#ffdad6"
    },
    "error": {
      "main": "#ba1a1a",
      "contrastText": "#ffffff",
      "light": "rgb(199, 71, 71)",
      "dark": "rgb(130, 18, 18)"
    },
    "onError": {
      "main": "#ffffff",
      "contrastText": "#ba1a1a"
    },
    "errorContainer": {
      "main": "#ffdad6",
      "contrastText": "#410002"
    },
    "onErrorContainer": {
      "main": "#410002",
      "contrastText": "#ffdad6"
    },
    "primaryFixed": {
      "main": "#fbd7ff"
    },
    "primaryFixedDim": {
      "main": "#f1afff"
    },
    "onPrimaryFixed": {
      "main": "#330044"
    },
    "onPrimaryFixedVariant": {
      "main": "#6d2583"
    },
    "secondaryFixed": {
      "main": "#f2dbf3"
    },
    "secondaryFixedDim": {
      "main": "#d6c0d6"
    },
    "onSecondaryFixed": {
      "main": "#241727"
    },
    "onSecondaryFixedVariant": {
      "main": "#514154"
    },
    "tertiaryFixed": {
      "main": "#ffdad6"
    },
    "tertiaryFixedDim": {
      "main": "#f5b7b2"
    },
    "onTertiaryFixed": {
      "main": "#33110f"
    },
    "onTertiaryFixedVariant": {
      "main": "#663b37"
    },
    "surface": {
      "main": "#fff7fb",
      "contrastText": "#1e1b1e"
    },
    "onSurface": {
      "main": "#1e1b1e",
      "contrastText": "#fff7fb"
    },
    "surfaceDim": {
      "main": "#e0d8dc"
    },
    "surfaceBright": {
      "main": "#fff7fb"
    },
    "surfaceContainerLowest": {
      "main": "#ffffff"
    },
    "surfaceContainerLow": {
      "main": "#faf1f6"
    },
    "surfaceContainer": {
      "main": "#f4ecf0"
    },
    "surfaceContainerHigh": {
      "main": "#eee6ea"
    },
    "surfaceContainerHighest": {
      "main": "#e8e0e5"
    },
    "surfaceVariant": {
      "main": "#ecdfe9",
      "contrastText": "#4c444c"
    },
    "onSurfaceVariant": {
      "main": "#4c444c",
      "contrastText": "#ecdfe9"
    },
    "outline": {
      "main": "#7e747d"
    },
    "outlineVariant": {
      "main": "#cfc3cd"
    },
    "inversePrimary": {
      "main": "#f1afff",
      "contrastText": ""
    },
    "inverseOnPrimary": {
      "main": "",
      "contrastText": "#f1afff"
    },
    "inverseSurface": {
      "main": "#332f33",
      "contrastText": "#332f33"
    },
    "inverseOnSurface": {
      "main": "#f7eef3",
      "contrastText": "#332f33"
    },
    "shadow": {
      "main": "#000000"
    },
    "scrim": {
      "main": "#000000"
    },
    "surfaceTintColor": {
      "main": "#883f9d"
    },
    "background": {
      "default": "#f4ecf0",
      "paper": "#fff7fb"
    },
    "onBackground": {
      "main": "#1e1b1e"
    },
    "common": {
      "white": "#fff7fb",
      "black": "#1e1b1e"
    },
    "text": {
      "primary": "#1e1b1e",
      "secondary": "#241727",
      "disabled": "rgba(0, 0, 0, 0.38)"
    },
    "info": {
      "main": "#125db2",
      "contrastText": "#ffffff",
      "light": "rgb(65, 125, 193)",
      "dark": "rgb(12, 65, 124)"
    },
    "onInfo": {
      "main": "#ffffff",
      "contrastText": "#125db2"
    },
    "infoContainer": {
      "main": "#d6e3ff",
      "contrastText": "#001b3d"
    },
    "onInfoContainer": {
      "main": "#001b3d",
      "contrastText": "#d6e3ff"
    },
    "success": {
      "main": "#006d43",
      "contrastText": "#ffffff",
      "light": "rgb(51, 138, 104)",
      "dark": "rgb(0, 76, 46)"
    },
    "onSuccess": {
      "main": "#ffffff",
      "contrastText": "#006d43"
    },
    "successContainer": {
      "main": "#92f7bc",
      "contrastText": "#002111"
    },
    "onSuccessContainer": {
      "main": "#002111",
      "contrastText": "#92f7bc"
    },
    "warning": {
      "main": "#934b00",
      "contrastText": "#ffffff",
      "light": "rgb(168, 111, 51)",
      "dark": "rgb(102, 52, 0)"
    },
    "onWarning": {
      "main": "#ffffff",
      "contrastText": "#934b00"
    },
    "warningContainer": {
      "main": "#ffdcc5",
      "contrastText": "#301400"
    },
    "onWarningContainer": {
      "main": "#301400",
      "contrastText": "#ffdcc5"
    },
    "divider": "#7e747d",
    "grey": {
      "50": "#fafafa",
      "100": "#f5f5f5",
      "200": "#eeeeee",
      "300": "#e0e0e0",
      "400": "#bdbdbd",
      "500": "#9e9e9e",
      "600": "#757575",
      "700": "#616161",
      "800": "#424242",
      "900": "#212121",
      "A100": "#f5f5f5",
      "A200": "#eeeeee",
      "A400": "#bdbdbd",
      "A700": "#616161"
    },
    "contrastThreshold": 3,
    "tonalOffset": 0.2,
    "action": {
      "active": "rgba(0, 0, 0, 0.54)",
      "hover": "rgba(0, 0, 0, 0.04)",
      "hoverOpacity": 0.04,
      "selected": "rgba(0, 0, 0, 0.08)",
      "selectedOpacity": 0.08,
      "disabled": "rgba(0, 0, 0, 0.26)",
      "disabledBackground": "rgba(0, 0, 0, 0.12)",
      "disabledOpacity": 0.38,
      "focus": "rgba(0, 0, 0, 0.12)",
      "focusOpacity": 0.12,
      "activatedOpacity": 0.12
    }
  },
  "shape": {
    "borderRadius": 4
  },
  "tones": {
    "primary": {
      "0": "#000000",
      "4": "#1e0029",
      "6": "#260033",
      "10": "#330044",
      "12": "#3a004c",
      "17": "#4a0060",
      "20": "#53036b",
      "22": "#580c70",
      "24": "#5d1374",
      "30": "#6d2583",
      "40": "#883f9d",
      "50": "#a359b9",
      "60": "#bf73d4",
      "70": "#dc8df1",
      "80": "#f1afff",
      "87": "#f8cbff",
      "90": "#fbd7ff",
      "92": "#fddfff",
      "94": "#ffe6ff",
      "95": "#ffebfe",
      "96": "#ffeffd",
      "98": "#fff7fb",
      "99": "#fffbff",
      "100": "#ffffff"
    },
    "secondary": {
      "0": "#000000",
      "4": "#160919",
      "6": "#1b0f1e",
      "10": "#241727",
      "12": "#281b2b",
      "17": "#332536",
      "20": "#3a2b3d",
      "22": "#3f3041",
      "24": "#433446",
      "30": "#514154",
      "40": "#6a596c",
      "50": "#847185",
      "60": "#9e8ba0",
      "70": "#b9a5bb",
      "80": "#d6c0d6",
      "87": "#ead3ea",
      "90": "#f2dbf3",
      "92": "#f8e1f8",
      "94": "#fee7fe",
      "95": "#ffebfe",
      "96": "#ffeffd",
      "98": "#fff7fb",
      "99": "#fffbff",
      "100": "#ffffff"
    },
    "tertiary": {
      "0": "#000000",
      "4": "#220504",
      "6": "#280907",
      "10": "#33110f",
      "12": "#381512",
      "17": "#441f1c",
      "20": "#4c2522",
      "22": "#512926",
      "24": "#572e2a",
      "30": "#663b37",
      "40": "#82524e",
      "50": "#9d6a65",
      "60": "#ba837e",
      "70": "#d79d97",
      "80": "#f5b7b2",
      "87": "#ffcfca",
      "90": "#ffdad6",
      "92": "#ffe2de",
      "94": "#ffe9e7",
      "95": "#ffedeb",
      "96": "#fff0ef",
      "98": "#fff8f7",
      "99": "#fffbff",
      "100": "#ffffff"
    },
    "neutral": {
      "0": "#000000",
      "4": "#100d10",
      "6": "#151215",
      "10": "#1e1b1e",
      "12": "#221f22",
      "17": "#2d292c",
      "20": "#332f33",
      "22": "#383437",
      "24": "#3c383b",
      "30": "#4a4549",
      "40": "#625d61",
      "50": "#7b7579",
      "60": "#958f93",
      "70": "#b0a9ad",
      "80": "#ccc4c9",
      "87": "#e0d8dc",
      "90": "#e8e0e5",
      "92": "#eee6ea",
      "94": "#f4ecf0",
      "95": "#f7eef3",
      "96": "#faf1f6",
      "98": "#fff7fb",
      "99": "#fffbff",
      "100": "#ffffff"
    },
    "neutralVariant": {
      "0": "#000000",
      "4": "#120c13",
      "6": "#171118",
      "10": "#201921",
      "12": "#241d25",
      "17": "#2f282f",
      "20": "#352e36",
      "22": "#3a323a",
      "24": "#3e373f",
      "30": "#4c444c",
      "40": "#645c64",
      "50": "#7e747d",
      "60": "#988e97",
      "70": "#b3a8b2",
      "80": "#cfc3cd",
      "87": "#e3d6e1",
      "90": "#ecdfe9",
      "92": "#f1e4ef",
      "94": "#f7eaf4",
      "95": "#faedf7",
      "96": "#fdf0fa",
      "98": "#fff7fb",
      "99": "#fffbff",
      "100": "#ffffff"
    },
    "error": {
      "0": "#000000",
      "4": "#280001",
      "6": "#310001",
      "10": "#410002",
      "12": "#490002",
      "17": "#5c0004",
      "20": "#690005",
      "22": "#710005",
      "24": "#790006",
      "30": "#93000a",
      "40": "#ba1a1a",
      "50": "#de3730",
      "60": "#ff5449",
      "70": "#ff897d",
      "80": "#ffb4ab",
      "87": "#ffcfc9",
      "90": "#ffdad6",
      "92": "#ffe2de",
      "94": "#ffe9e6",
      "95": "#ffedea",
      "96": "#fff0ee",
      "98": "#fff8f7",
      "99": "#fffbff",
      "100": "#ffffff"
    }
  },
  "unstable_sxConfig": {
    "border": {
      "themeKey": "borders"
    },
    "borderTop": {
      "themeKey": "borders"
    },
    "borderRight": {
      "themeKey": "borders"
    },
    "borderBottom": {
      "themeKey": "borders"
    },
    "borderLeft": {
      "themeKey": "borders"
    },
    "borderColor": {
      "themeKey": "palette"
    },
    "borderTopColor": {
      "themeKey": "palette"
    },
    "borderRightColor": {
      "themeKey": "palette"
    },
    "borderBottomColor": {
      "themeKey": "palette"
    },
    "borderLeftColor": {
      "themeKey": "palette"
    },
    "borderRadius": {
      "themeKey": "shape.borderRadius"
    },
    "color": {
      "themeKey": "palette"
    },
    "bgcolor": {
      "themeKey": "palette",
      "cssProperty": "backgroundColor"
    },
    "backgroundColor": {
      "themeKey": "palette"
    },
    "p": {},
    "pt": {},
    "pr": {},
    "pb": {},
    "pl": {},
    "px": {},
    "py": {},
    "padding": {},
    "paddingTop": {},
    "paddingRight": {},
    "paddingBottom": {},
    "paddingLeft": {},
    "paddingX": {},
    "paddingY": {},
    "paddingInline": {},
    "paddingInlineStart": {},
    "paddingInlineEnd": {},
    "paddingBlock": {},
    "paddingBlockStart": {},
    "paddingBlockEnd": {},
    "m": {},
    "mt": {},
    "mr": {},
    "mb": {},
    "ml": {},
    "mx": {},
    "my": {},
    "margin": {},
    "marginTop": {},
    "marginRight": {},
    "marginBottom": {},
    "marginLeft": {},
    "marginX": {},
    "marginY": {},
    "marginInline": {},
    "marginInlineStart": {},
    "marginInlineEnd": {},
    "marginBlock": {},
    "marginBlockStart": {},
    "marginBlockEnd": {},
    "displayPrint": {
      "cssProperty": false
    },
    "display": {},
    "overflow": {},
    "textOverflow": {},
    "visibility": {},
    "whiteSpace": {},
    "flexBasis": {},
    "flexDirection": {},
    "flexWrap": {},
    "justifyContent": {},
    "alignItems": {},
    "alignContent": {},
    "order": {},
    "flex": {},
    "flexGrow": {},
    "flexShrink": {},
    "alignSelf": {},
    "justifyItems": {},
    "justifySelf": {},
    "gap": {},
    "rowGap": {},
    "columnGap": {},
    "gridColumn": {},
    "gridRow": {},
    "gridAutoFlow": {},
    "gridAutoColumns": {},
    "gridAutoRows": {},
    "gridTemplateColumns": {},
    "gridTemplateRows": {},
    "gridTemplateAreas": {},
    "gridArea": {},
    "position": {},
    "zIndex": {
      "themeKey": "zIndex"
    },
    "top": {},
    "right": {},
    "bottom": {},
    "left": {},
    "boxShadow": {
      "themeKey": "shadows"
    },
    "width": {},
    "maxWidth": {},
    "minWidth": {},
    "height": {},
    "maxHeight": {},
    "minHeight": {},
    "boxSizing": {},
    "fontFamily": {
      "themeKey": "typography"
    },
    "fontSize": {
      "themeKey": "typography"
    },
    "fontStyle": {
      "themeKey": "typography"
    },
    "fontWeight": {
      "themeKey": "typography"
    },
    "letterSpacing": {},
    "textTransform": {},
    "lineHeight": {},
    "textAlign": {},
    "typography": {
      "cssProperty": false,
      "themeKey": "typography"
    }
  },
  "mixins": {
    "toolbar": {
      "minHeight": 56,
      "@media (min-width:0px)": {
        "@media (orientation: landscape)": {
          "minHeight": 48
        }
      },
      "@media (min-width:600px)": {
        "minHeight": 64
      }
    }
  },
  "shadows": [
    "none",
    "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
    "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
    "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
    "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
    "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
    "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)",
    "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
    "0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)",
    "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
    "0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)",
    "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)",
    "0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)",
    "0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)",
    "0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)",
    "0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)",
    "0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)",
    "0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)",
    "0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)",
    "0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)",
    "0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)",
    "0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)",
    "0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)",
    "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)"
  ],
  "typography": {
    "htmlFontSize": 16,
    "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500,
    "fontWeightBold": 700,
    "h1": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 300,
      "fontSize": "6rem",
      "lineHeight": 1.167,
      "letterSpacing": "-0.01562em"
    },
    "h2": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 300,
      "fontSize": "3.75rem",
      "lineHeight": 1.2,
      "letterSpacing": "-0.00833em"
    },
    "h3": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "3rem",
      "lineHeight": 1.167,
      "letterSpacing": "0em"
    },
    "h4": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "2.125rem",
      "lineHeight": 1.235,
      "letterSpacing": "0.00735em"
    },
    "h5": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "1.5rem",
      "lineHeight": 1.334,
      "letterSpacing": "0em"
    },
    "h6": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 500,
      "fontSize": "1.25rem",
      "lineHeight": 1.6,
      "letterSpacing": "0.0075em"
    },
    "subtitle1": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "1rem",
      "lineHeight": 1.75,
      "letterSpacing": "0.00938em"
    },
    "subtitle2": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 500,
      "fontSize": "0.875rem",
      "lineHeight": 1.57,
      "letterSpacing": "0.00714em"
    },
    "body1": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "1rem",
      "lineHeight": 1.5,
      "letterSpacing": "0.00938em"
    },
    "body2": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "0.875rem",
      "lineHeight": 1.43,
      "letterSpacing": "0.01071em"
    },
    "button": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 500,
      "fontSize": "0.875rem",
      "lineHeight": 1.75,
      "letterSpacing": "0.02857em",
      "textTransform": "uppercase"
    },
    "caption": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "0.75rem",
      "lineHeight": 1.66,
      "letterSpacing": "0.03333em"
    },
    "overline": {
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "fontWeight": 400,
      "fontSize": "0.75rem",
      "lineHeight": 2.66,
      "letterSpacing": "0.08333em",
      "textTransform": "uppercase"
    },
    "inherit": {
      "fontFamily": "inherit",
      "fontWeight": "inherit",
      "fontSize": "inherit",
      "lineHeight": "inherit",
      "letterSpacing": "inherit"
    }
  },
  "transitions": {
    "easing": {
      "easeInOut": "cubic-bezier(0.4, 0, 0.2, 1)",
      "easeOut": "cubic-bezier(0.0, 0, 0.2, 1)",
      "easeIn": "cubic-bezier(0.4, 0, 1, 1)",
      "sharp": "cubic-bezier(0.4, 0, 0.6, 1)"
    },
    "duration": {
      "shortest": 150,
      "shorter": 200,
      "short": 250,
      "standard": 300,
      "complex": 375,
      "enteringScreen": 225,
      "leavingScreen": 195
    }
  },
  "zIndex": {
    "mobileStepper": 1000,
    "fab": 1050,
    "speedDial": 1050,
    "appBar": 1100,
    "drawer": 1200,
    "modal": 1300,
    "snackbar": 1400,
    "tooltip": 1500
  }
}

darkTheme = createTheme(darkTheme)
lightTheme = createTheme(lightTheme)

let theme = () => {
  if (window.localStorage.getItem('themeMode') === null) {
    setThemeMode('light')
    return lightTheme
  }

  document.getElementsByTagName('body')[0].style.backgroundColor = window.localStorage.getItem('themeMode') === 'light' ? '#fafafa' : '#303030'
  return window.localStorage.getItem('themeMode') === 'light' ? lightTheme : darkTheme
}


let setThemeMode = (mode) => {
  let event = new Event('themeModeChange')
  window.localStorage.setItem('themeMode', mode)
  event.newValue = mode
  window.dispatchEvent(event)
}

let rotateThemeMode = () => {
  let mode = window.localStorage.getItem('themeMode') === 'light' ? 'dark' : 'light'
  setThemeMode(mode)
}

let getCurrentThemeMode = () => {
  return window.localStorage.getItem('themeMode')
}

let listenToThemeModeChange = (callback) => {
  window.addEventListener('themeModeChange', (e) => {
    callback(e.newValue)
  })
}

const Background = (props) => (<div style={{
  position: "absolute",
  width: "100%",
  height: "100%",
  backgroundImage: `url(${props.img})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  zIndex: -2000,
  transition: 'background-image 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
}}>{props.children}</div>)


export default {
    lightTheme,
    darkTheme,
    theme,
    setThemeMode,
    rotateThemeMode,
    listenToThemeModeChange,
    imgBackground3,
    imgOops,
    Background,
    getCurrentThemeMode,
    loginBackground
}