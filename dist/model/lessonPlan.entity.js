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
exports.LessonPlan = void 0;
const typeorm_1 = require("typeorm");
const user_entity_js_1 = require("./user.entity.js");
exports.LessonPlan = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _id_decorators;
    let _id_initializers = [];
    let _user_decorators;
    let _user_initializers = [];
    let _syllabus_decorators;
    let _syllabus_initializers = [];
    let _content_decorators;
    let _content_initializers = [];
    let _classesQuantity_decorators;
    let _classesQuantity_initializers = [];
    let _detail_decorators;
    let _detail_initializers = [];
    let _creativity_decorators;
    let _creativity_initializers = [];
    let _size_decorators;
    let _size_initializers = [];
    let _lesson_type_decorators;
    let _lesson_type_initializers = [];
    let _prompt_decorators;
    let _prompt_initializers = [];
    let _create_date_decorators;
    let _create_date_initializers = [];
    var LessonPlan = _classThis = class {
        constructor() {
            /**
             * Identificador único do plano.
             */
            this.id = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _id_initializers, void 0));
            /**
             * O usuário referido
             */
            this.user = __runInitializers(this, _user_initializers, void 0);
            /**
             * Ementa da matéria
             */
            this.syllabus = __runInitializers(this, _syllabus_initializers, void 0);
            /**
             * Conteúdo formativo da aula
             */
            this.content = __runInitializers(this, _content_initializers, void 0);
            /**
             * Quantidade de aulas disponíveis
             */
            this.classesQuantity = __runInitializers(this, _classesQuantity_initializers, void 0);
            /**
             * Nível de detalhamento
             */
            this.detail = __runInitializers(this, _detail_initializers, void 0);
            /**
             * Nível de criatividade (temperature)
             */
            this.creativity = __runInitializers(this, _creativity_initializers, void 0); // esse tipo deve estar errado
            /**
             * Tamanho em quantidade de palavras
             */
            this.size = __runInitializers(this, _size_initializers, void 0);
            /**
             * Nível de detalhamento
             */
            this.lesson_type = __runInitializers(this, _lesson_type_initializers, void 0);
            /**
             * Prompt utilizada para gerar
             */
            this.prompt = __runInitializers(this, _prompt_initializers, void 0);
            /**
             * Data de criação
             */
            this.create_date = __runInitializers(this, _create_date_initializers, void 0);
        }
    };
    __setFunctionName(_classThis, "LessonPlan");
    (() => {
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _user_decorators = [(0, typeorm_1.OneToOne)(() => user_entity_js_1.User, user => user.id, { eager: true }), (0, typeorm_1.JoinColumn)()];
        _syllabus_decorators = [(0, typeorm_1.Column)({ comment: "EMENTA" })];
        _content_decorators = [(0, typeorm_1.Column)()];
        _classesQuantity_decorators = [(0, typeorm_1.Column)()];
        _detail_decorators = [(0, typeorm_1.Column)()];
        _creativity_decorators = [(0, typeorm_1.Column)()];
        _size_decorators = [(0, typeorm_1.Column)()];
        _lesson_type_decorators = [(0, typeorm_1.Column)()];
        _prompt_decorators = [(0, typeorm_1.Column)()];
        _create_date_decorators = [(0, typeorm_1.Column)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } } }, _id_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: obj => "user" in obj, get: obj => obj.user, set: (obj, value) => { obj.user = value; } } }, _user_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _syllabus_decorators, { kind: "field", name: "syllabus", static: false, private: false, access: { has: obj => "syllabus" in obj, get: obj => obj.syllabus, set: (obj, value) => { obj.syllabus = value; } } }, _syllabus_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: obj => "content" in obj, get: obj => obj.content, set: (obj, value) => { obj.content = value; } } }, _content_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _classesQuantity_decorators, { kind: "field", name: "classesQuantity", static: false, private: false, access: { has: obj => "classesQuantity" in obj, get: obj => obj.classesQuantity, set: (obj, value) => { obj.classesQuantity = value; } } }, _classesQuantity_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _detail_decorators, { kind: "field", name: "detail", static: false, private: false, access: { has: obj => "detail" in obj, get: obj => obj.detail, set: (obj, value) => { obj.detail = value; } } }, _detail_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _creativity_decorators, { kind: "field", name: "creativity", static: false, private: false, access: { has: obj => "creativity" in obj, get: obj => obj.creativity, set: (obj, value) => { obj.creativity = value; } } }, _creativity_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _size_decorators, { kind: "field", name: "size", static: false, private: false, access: { has: obj => "size" in obj, get: obj => obj.size, set: (obj, value) => { obj.size = value; } } }, _size_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _lesson_type_decorators, { kind: "field", name: "lesson_type", static: false, private: false, access: { has: obj => "lesson_type" in obj, get: obj => obj.lesson_type, set: (obj, value) => { obj.lesson_type = value; } } }, _lesson_type_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _prompt_decorators, { kind: "field", name: "prompt", static: false, private: false, access: { has: obj => "prompt" in obj, get: obj => obj.prompt, set: (obj, value) => { obj.prompt = value; } } }, _prompt_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _create_date_decorators, { kind: "field", name: "create_date", static: false, private: false, access: { has: obj => "create_date" in obj, get: obj => obj.create_date, set: (obj, value) => { obj.create_date = value; } } }, _create_date_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        LessonPlan = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LessonPlan = _classThis;
})();
//# sourceMappingURL=lessonPlan.entity.js.map