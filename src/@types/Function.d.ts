interface Function {
  applyParams(params: any): void;
}

Function.prototype.applyParams = function (params: any) {
  this.apply(this, params);
};
