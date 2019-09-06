// @flow

import { GridLayer as LeafletGridLayer } from 'leaflet'

import MapLayer from './MapLayer'
import type { GridLayerProps } from './types'

export default class GridLayer<
  LeafletElement: LeafletGridLayer,
  Props: GridLayerProps,
> extends MapLayer<LeafletElement, Props> {
  createLeafletElement(props: Props): LeafletElement {
    return new LeafletGridLayer(this.getOptions(props))
  }

  updateLeafletElement(fromProps: Props, toProps: Props) {
    const { opacity, zIndex } = toProps
    if (opacity !== fromProps.opacity) {
      this.leafletElement.setOpacity(opacity)
    }
    if (zIndex !== fromProps.zIndex) {
      this.leafletElement.setZIndex(zIndex)
    }
  }

  getOptions(props: Props): Props {
    const options = super.getOptions(props)
    return props.leaflet.map == null
      ? options
      : // $FlowFixMe: object spread type
        {
          maxZoom: props.leaflet.map.options.maxZoom,
          minZoom: props.leaflet.map.options.minZoom,
          zoomSnap: props.leaflet.map.options.zoomSnap,
          bounds: props.leaflet.map.options.bounds,
          ...options,
        }
  }

  render() {
    return null
  }
}
