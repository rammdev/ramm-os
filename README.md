# RAMM OS

Above the clouds, on a mission to provide the development tools of tomorrow with a powerful production team.

## Making your site compatible with RAMM OS

By default, RAMM OS will download your entire site and use placeholder icons, theme colours etc.

You can customise these options by creating a `ramm.app.json` in the root of your site (for example `https://richienb.github.io/ramm.app.json`) with the following configuration:

```json
{
    "type": "ramm-app",
    "spec": 0,
    "id": "richie-bendall-website",
    "name": "Richie Bendall's Website",
    "source": "https://github.com/Richienb/richienb.github.io/archive/master.zip",
    "root": "richienb.github.io-master",
    "icon": "resources/icon-48x48.png",
    "start": "index.html",
    "themecolour": "#3f51b5"
}
```

You can also specify a packages field that acts like a `package.json` dependencies field:

```json
{
    "packages": {
        "bluebird": "^3.5.5",
        "dayjs": "^1.8.14"
    }
}
```

### Please note

-   The icon will be scaled down to 24x24px.
-   The icon must be in a format supported by a modern version of chrome.
-   The theme colour can be represented in any css-compatible format.

## Initial sketch

![UI initial sketch](https://lh3.googleusercontent.com/1DKSRwIhr9W_8v6BEyOmMysknieK5SGLL4t61o1-f2WceTDfUhAEo6JkhiADzzeAOoXsMmJFPQFcae09GpDHmrfQyVuQUXvSwdRoxuAPeqsIcJylIrnRQ0ffxF7IPnv0N2k-bKCb-BAsu5EpYqrq4vtkgbgA-YRbY6T3_l7mCkijp6uyyBHycUsAm2T0_ZtIikazFTOrI4wtvHJPxyTgofcXNQvjfKKB9BwEw69XZLK522IbYgKyK6wFOqysrByDp9EtGLyOmjuuL5978B2i52plSN7bSJOqULq70GRetZmXec5i4WgKeUD8k81exz6n5_35ynZCw50_5kNupuN_LhrBHs7xASu-gvDV0X0XGtlnCV5FMEYKYgyWdJ3eMfqK0k_UNlGojD_TFMjDfLofgkDQ3QB_e4pySZSV9AneLqMFbxD4oCVaHT25jSS4aYfXUdKUmtetWFKC-q4q-SLs6ODoKvM4NkYejU9GH0qxdzGX9wfjrKGiP4x_JscUvEyF5_qBPcL7SUIfaoWnGLFsMOBOe0F5_0ygSWJ3yw47WXgNJYKVsUfcs-bCz7Lo18MYU398vfloKD59h4qh1Bc18RLIqYZSKzZylsg6lhtHdkB0YORuIsB82ZNBZaRJwJVhaQUGVbg0FaMvNF1UXOozJON2yl0HuMyC=w1065-h750-no)

![JS spec initial sketch](https://lh3.googleusercontent.com/4XAsQshN_1em7JcppkJD2JlKQ9Nqg7aFBPhB3ohr1AnZMHBaMd4MQjYVKvkto8jY1ZZHxHkPuirE8fv5WncFWnCo5D9fsUqaH8Ax1xPuXH5C28nejhEp1r_I_aFPWiggCtbEzq0fOx-UjlDXfKb9x5-OwHvLrIOYAi0mi9rYV9BAQMzhljeJAC_1EW7aLDWcW24FHqrjmTpSM_xYR6jEtAKrLbatImLBKoLydD2w9xiMk8EeVih53yKl0Sn4RNc4Fjmdfj5UsAYIvkbSn6GjCF16gBKBJH_CArfRN6OuSx_z0MqxA97JwMswjV9EJm7GPP2kFFkDbIwI1Nu6fl0A2UGusEue60dKI-PMHCDQKwNTQPZgyRiJxETKZT1AEXBDdBIsOFNlqjH6iruKf6VrtKPOmlMrDlrqWXon-Dvr6uCBiJr_tvgB_40aARWR1T1neXtG5jB5VHEo1z85a7D5JTElwMtyqK1gOtYXFvUQMVrE3YBPHLX5wUO1RMINzkPc4lMRUXVABQNv_Hwf0rVYcmOvbaYqFkNAEgc2LvwwBZkhApQ6imC_XlPwYrEMDSFTPlQVKUpTxwTm_2yUz_UW_3QwrRiWm3KZJIzbuhaF-ESSzUX7qiozA9Ls5ibWmntob66VHdSXlHG-1ex6JYDbPlW6sXAXMCRI=w1038-h750-no)
