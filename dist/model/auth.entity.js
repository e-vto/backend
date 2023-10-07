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
exports.Auth = void 0;
const typeorm_1 = require("typeorm");
const user_entity_js_1 = require("./user.entity.js");
exports.Auth = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _id_decorators;
    let _id_initializers = [];
    let _user_decorators;
    let _user_initializers = [];
    let _password_hashed_decorators;
    let _password_hashed_initializers = [];
    let _password_salt_decorators;
    let _password_salt_initializers = [];
    var Auth = _classThis = class {
        constructor() {
            this.id = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _id_initializers, void 0));
            /**
             * O usuário referido
             */
            this.user = __runInitializers(this, _user_initializers, void 0);
            /**
             * A senha do usuário
             */
            this.password_hashed = __runInitializers(this, _password_hashed_initializers, void 0);
            /**
             * A salt da senha, em plain-text.
             * Ela deve ser concatenada após a senha, para obter o valor que deve ser guardado no banco.
             * (algo como: sha256(plaintext_password + password_salt)
             * O valor é único para cada usuário.
             */
            this.password_salt = __runInitializers(this, _password_salt_initializers, void 0);
        }
    };
    __setFunctionName(_classThis, "Auth");
    (() => {
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _user_decorators = [(0, typeorm_1.OneToOne)(() => user_entity_js_1.User, user => user.id, { eager: true }), (0, typeorm_1.JoinColumn)()];
        _password_hashed_decorators = [(0, typeorm_1.Column)()];
        _password_salt_decorators = [(0, typeorm_1.Column)({ unique: true })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } } }, _id_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: obj => "user" in obj, get: obj => obj.user, set: (obj, value) => { obj.user = value; } } }, _user_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _password_hashed_decorators, { kind: "field", name: "password_hashed", static: false, private: false, access: { has: obj => "password_hashed" in obj, get: obj => obj.password_hashed, set: (obj, value) => { obj.password_hashed = value; } } }, _password_hashed_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _password_salt_decorators, { kind: "field", name: "password_salt", static: false, private: false, access: { has: obj => "password_salt" in obj, get: obj => obj.password_salt, set: (obj, value) => { obj.password_salt = value; } } }, _password_salt_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        Auth = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Auth = _classThis;
})();
//# sourceMappingURL=auth.entity.js.map