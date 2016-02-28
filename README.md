# Leed RSS Or Site View

## Description

This is a [Leed](https://github.com/ldleman/Leed)'s plugin to switch between the feed or the live (iframe) version of the content.

## Requirements

You need to have a working copy of Leed. If not look at the [Leed's install instructions](https://github.com/ldleman/Leed#installation-1).


## How does it work?

If the theme that you are using handles this plugin, you can switch the view clicking at the switch button.

## Leed's theme handling this plugin

- [LeedVibes](https://github.com/Simounet/LeedVibes)

## Install

1. Download [LeedRSSOrSiteView](archive/master.zip) into the `plugins` folder of Leed
2. Activate `LeedRSSOrSiteView` from the settings page

## Uninstall

1. Disable `LeedRSSOrSiteView` from the settings page
2. Remove the `LeedRSSOrSiteView` folder from `plugins`

## How can my theme handles this plugin?

- Add this to each parent event class container:
`{if="isset($value->view) && $value->view == 1"} event--website-view js-website-view{/if}`

- Add this to each event container where you want the button to appear:
```
{if="isset($value->view)"}
    <button class="article__content__switch-view js-switch-view" data-view="{$value->view}">{if="$value->view == 0"}{function="_t('SITE_VIEW')"}{else}{function="_t('RSS_VIEW')"}{/if}</button>
{/if}
```


## Any idea or trouble? You implemented this plugin to your theme?

- [Open an issue](https://github.com/Simounet/LeedRSSOrSiteView/issues/new)
- [Come to the #Leed IRC channel on Freenode](https://kiwiirc.com/client/irc.freenode.net/#Leed)
- [Mail](mailto:leedvibes@simounet.net)

## Licence

Leed RSS Or Site View is under [MIT License](http://opensource.org/licenses/MIT).
