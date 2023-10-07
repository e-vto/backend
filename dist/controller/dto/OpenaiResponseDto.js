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
    let _lessonPlanArray_decorators;
    let _lessonPlanArray_initializers = [];
    return _a = class OpenaiResponseDto {
            constructor() {
                this.lessonPlanArray = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _lessonPlanArray_initializers, void 0));
            }
        },
        (() => {
            _lessonPlanArray_decorators = [(0, class_validator_1.IsArray)()];
            __esDecorate(null, null, _lessonPlanArray_decorators, { kind: "field", name: "lessonPlanArray", static: false, private: false, access: { has: obj => "lessonPlanArray" in obj, get: obj => obj.lessonPlanArray, set: (obj, value) => { obj.lessonPlanArray = value; } } }, _lessonPlanArray_initializers, _instanceExtraInitializers);
        })(),
        _a;
})();
let classPlan = (() => {
    var _a;
    let _instanceExtraInitializers_1 = [];
    let _theme_decorators;
    let _theme_initializers = [];
    let _objectives_decorators;
    let _objectives_initializers = [];
    let _duration_decorators;
    let _duration_initializers = [];
    let _method_decorators;
    let _method_initializers = [];
    let _content_decorators;
    let _content_initializers = [];
    return _a = class classPlan {
            constructor() {
                /**
                * Tema da aula vindo do GPT
                */
                this.theme = (__runInitializers(this, _instanceExtraInitializers_1), __runInitializers(this, _theme_initializers, void 0));
                /**
                * Objetivos da aula vindo do GPT
                */
                this.objectives = __runInitializers(this, _objectives_initializers, void 0);
                /**
                * Duração da aula vindo do GPT
                */
                this.duration = __runInitializers(this, _duration_initializers, void 0);
                /**
                * Método da aula vindo do GPT
                */
                this.method = __runInitializers(this, _method_initializers, void 0);
                /**
                * Conteúdo da aula vindo do GPT
                */
                this.content = __runInitializers(this, _content_initializers, void 0);
            }
        },
        (() => {
            _theme_decorators = [(0, class_validator_1.IsArray)()];
            _objectives_decorators = [(0, class_validator_1.IsArray)()];
            _duration_decorators = [(0, class_validator_1.IsArray)()];
            _method_decorators = [(0, class_validator_1.IsArray)()];
            _content_decorators = [(0, class_validator_1.IsArray)()];
            __esDecorate(null, null, _theme_decorators, { kind: "field", name: "theme", static: false, private: false, access: { has: obj => "theme" in obj, get: obj => obj.theme, set: (obj, value) => { obj.theme = value; } } }, _theme_initializers, _instanceExtraInitializers_1);
            __esDecorate(null, null, _objectives_decorators, { kind: "field", name: "objectives", static: false, private: false, access: { has: obj => "objectives" in obj, get: obj => obj.objectives, set: (obj, value) => { obj.objectives = value; } } }, _objectives_initializers, _instanceExtraInitializers_1);
            __esDecorate(null, null, _duration_decorators, { kind: "field", name: "duration", static: false, private: false, access: { has: obj => "duration" in obj, get: obj => obj.duration, set: (obj, value) => { obj.duration = value; } } }, _duration_initializers, _instanceExtraInitializers_1);
            __esDecorate(null, null, _method_decorators, { kind: "field", name: "method", static: false, private: false, access: { has: obj => "method" in obj, get: obj => obj.method, set: (obj, value) => { obj.method = value; } } }, _method_initializers, _instanceExtraInitializers_1);
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: obj => "content" in obj, get: obj => obj.content, set: (obj, value) => { obj.content = value; } } }, _content_initializers, _instanceExtraInitializers_1);
        })(),
        _a;
})();
//# sourceMappingURL=OpenaiResponseDto.js.map