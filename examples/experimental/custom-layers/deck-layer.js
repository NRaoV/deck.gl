import {Deck} from '@deck.gl/core';

export default class DeckLayer {
  constructor({id = 'deck-layer', layers}) {
    this.id = id;
    this.type = 'custom';

    this.deck = null;

    this.layers = layers;
  }

  _getViewState() {
    const {lng, lat} = this.map.getCenter();
    return {
      longitude: lng,
      latitude: lat,
      zoom: this.map.getZoom(),
      bearing: this.map.getBearing(),
      pitch: this.map.getPitch()
    }
  }

  onAdd(map, gl) {
    console.log('onAdd', map, gl);

    this.map = map;
    this.deck = new Deck({
      canvas: 'deck-canvas',
      width: '100%',
      height: '100%',
      viewState: this._getViewState(),
      controller: false,
      customRender: true
    });
    this.deck._setGLContext(gl);
    this.deck.setProps({layers: this.layers});
  }

  render3D(gl, matrix) {
    const viewState = this._getViewState();
    console.log('render3D', viewState, matrix);

    this.deck.setProps({viewState});
    this.deck._drawLayers();
    this.map.triggerRepaint();
  }
}
