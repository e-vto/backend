"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.push(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.push(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
exports.default = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _syllabus_decorators;
    let _syllabus_initializers = [];
    let _content_decorators;
    let _content_initializers = [];
    let _classesQuantity_decorators;
    let _classesQuantity_initializers = [];
    return _a = class OpenaiPayloadDto {
            constructor() {
                // ementa
                this.syllabus = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _syllabus_initializers, void 0));
                this.content = __runInitializers(this, _content_initializers, void 0);
                this.classesQuantity = __runInitializers(this, _classesQuantity_initializers, void 0);
            }
        },
        (() => {
            _syllabus_decorators = [(0, class_validator_1.IsString)()];
            _content_decorators = [(0, class_validator_1.IsString)()];
            _classesQuantity_decorators = [(0, class_validator_1.IsNumber)()];
            __esDecorate(null, null, _syllabus_decorators, { kind: "field", name: "syllabus", static: false, private: false, access: { has: obj => "syllabus" in obj, get: obj => obj.syllabus, set: (obj, value) => { obj.syllabus = value; } } }, _syllabus_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: obj => "content" in obj, get: obj => obj.content, set: (obj, value) => { obj.content = value; } } }, _content_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _classesQuantity_decorators, { kind: "field", name: "classesQuantity", static: false, private: false, access: { has: obj => "classesQuantity" in obj, get: obj => obj.classesQuantity, set: (obj, value) => { obj.classesQuantity = value; } } }, _classesQuantity_initializers, _instanceExtraInitializers);
        })(),
        _a;
})();
//# sourceMappingURL=OpenaiPayloadDto.js.map