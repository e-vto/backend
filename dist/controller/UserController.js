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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const routing_controllers_1 = require("routing-controllers");
const userService_1 = require("../service/userService");
const authService_1 = require("../service/authService");
const user_entity_1 = require("../model/user.entity");
const mailService_1 = __importDefault(require("../service/mailService"));
exports.UserController = (() => {
    let _classDecorators = [(0, routing_controllers_1.JsonController)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _register_decorators;
    let _login_decorators;
    let _getCurrentUser_decorators;
    let _getOne_decorators;
    let _resetPassword_decorators;
    var UserController = _classThis = class {
        /**
         * Faz o cadastro de um usuário.
         * @param user
         * @returns
         */
        register(payload) {
            return __awaiter(this, void 0, void 0, function* () {
                const userObj = new user_entity_1.User();
                userObj.name = payload.name;
                userObj.email = payload.email;
                userObj.cpf = payload.cpf;
                userObj.phone = payload.phone;
                const password = payload.password;
                const response = yield userService_1.userService.registerUser(userObj, password);
                return response;
            });
        }
        /**
         * Faz o login de um usuário.
         * O request body é composto de username e senha. Se a autenticação é
         * validada, retorna um SessionToken para o usuário. Esse SessionToken deve
         * ser usado para acessar endpoints que requerem login.
         */
        login(loginRequest) {
            return __awaiter(this, void 0, void 0, function* () {
                const token = yield authService_1.authService.login(loginRequest.username, loginRequest.password);
                return {
                    token: token.token_value,
                    expires_at: token.expires_at.toISOString(),
                };
            });
        }
        /**
         * Retorna o usuário atual. O usuário atual é o usuário correspondente ao
         * SessionToken do request.
         */
        getCurrentUser(sessionUser) {
            return __awaiter(this, void 0, void 0, function* () {
                return sessionUser;
            });
        }
        getOne(id) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = yield userService_1.userService.getUser(id);
                if (user === null) {
                    throw new routing_controllers_1.NotFoundError("Usuário não encontrado.");
                }
                return user;
            });
        }
        /**
         * Retorna o token que vai ser autenticado. // não acho uma boa ideia, tem jeitos melhores de fazer isso mas da mt preguiça
         */
        resetPassword() {
            return __awaiter(this, void 0, void 0, function* () {
                const mailService = new mailService_1.default();
                mailService.sendEmail("insira@um.email");
                return;
            });
        }
        constructor() {
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
    __setFunctionName(_classThis, "UserController");
    (() => {
        _register_decorators = [(0, routing_controllers_1.Post)("/users/register")];
        _login_decorators = [(0, routing_controllers_1.Post)("/users/login")];
        _getCurrentUser_decorators = [(0, routing_controllers_1.Get)("/users/@me"), (0, routing_controllers_1.Authorized)()];
        _getOne_decorators = [(0, routing_controllers_1.Get)("/users/:id")];
        _resetPassword_decorators = [(0, routing_controllers_1.Post)("/users/reset/password")];
        __esDecorate(_classThis, null, _register_decorators, { kind: "method", name: "register", static: false, private: false, access: { has: obj => "register" in obj, get: obj => obj.register } }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _login_decorators, { kind: "method", name: "login", static: false, private: false, access: { has: obj => "login" in obj, get: obj => obj.login } }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getCurrentUser_decorators, { kind: "method", name: "getCurrentUser", static: false, private: false, access: { has: obj => "getCurrentUser" in obj, get: obj => obj.getCurrentUser } }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getOne_decorators, { kind: "method", name: "getOne", static: false, private: false, access: { has: obj => "getOne" in obj, get: obj => obj.getOne } }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _resetPassword_decorators, { kind: "method", name: "resetPassword", static: false, private: false, access: { has: obj => "resetPassword" in obj, get: obj => obj.resetPassword } }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        UserController = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UserController = _classThis;
})();
//# sourceMappingURL=UserController.js.map