function loadCircuits(circuitList) {
  circuitList.forEach(function (circuit) {
    config.circuits[circuit.map] = {
      map:  circuit.name,
      anim: circuit.anim
    };
  });
}
