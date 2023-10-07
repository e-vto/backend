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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionToken = void 0;
const typeorm_1 = require("typeorm");
const user_entity_js_1 = require("./user.entity.js");
exports.SessionToken = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _token_id_decorators;
    let _token_id_initializers = [];
    let _token_value_decorators;
    let _token_value_initializers = [];
    let _user_decorators;
    let _user_initializers = [];
    var SessionToken = _classThis = class {
        constructor() {
            /**
             * Identificador único do token.
             */
            this.token_id = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _token_id_initializers, void 0));
            /**
             * Valor único do token.
             */
            this.token_value = __runInitializers(this, _token_value_initializers, void 0);
            /**
             * Usuário associado ao token de sessão.
             */
            this.user = __runInitializers(this, _user_initializers, void 0);
        }
    };
    __setFunctionName(_classThis, "SessionToken");
    (() => {
        _token_id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _token_value_decorators = [(0, typeorm_1.Column)({ unique: true })];
        _user_decorators = [(0, typeorm_1.OneToOne)(() => user_entity_js_1.User, { eager: true }), (0, typeorm_1.JoinColumn)()];
        __esDecorate(null, null, _token_id_decorators, { kind: "field", name: "token_id", static: false, private: false, access: { has: obj => "token_id" in obj, get: obj => obj.token_id, set: (obj, value) => { obj.token_id = value; } } }, _token_id_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _token_value_decorators, { kind: "field", name: "token_value", static: false, private: false, access: { has: obj => "token_value" in obj, get: obj => obj.token_value, set: (obj, value) => { obj.token_value = value; } } }, _token_value_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: obj => "user" in obj, get: obj => obj.user, set: (obj, value) => { obj.user = value; } } }, _user_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        SessionToken = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SessionToken = _classThis;
})();
//# sourceMappingURL=sessionToken.entity.js.map