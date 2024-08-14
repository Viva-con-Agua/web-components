import { Example } from '@/types/Example';
import { defineStore } from 'pinia';
import api from './api';
import { notification } from '@/composables/notification';
import { required } from '@vuelidate/validators';

interface ExampleState {
    create: Example;
    current: Example;
    edit: Example;
    doCreate: boolean;
    doEdit: boolean;
    doView: boolean;
    list: Example[];
}

const defaultExample = {
    id: '',
    name: '',
} as Example;

export const useExampleStore = defineStore('ExampleStore', {
    state: () => {
        return {
            create: { ...defaultExample } as Example,
            current: {} as Example,
            edit: {} as Example,
            doCreate: false,
            doEdit: false,
            doView: false,
            list: [] as Example[],
        } as ExampleState;
    },
    getters: {
        validations: (state: ExampleState) => {
            return {
                data: {
                    name: { required },
                },
            };
        },
    },
    actions: {
        resetCreate() {
            this.create = { ...defaultExample } as Example;
        },
        resetCurrent() {
            this.current = {} as Example;
        },
        resetList() {
            this.list = [] as Example[];
        },
        resetEdit() {
            this.edit = { ...this.current } as Example;
        },
        getList() {
            return new Promise((resolve, reject) => {
                api.call
                    .get('/example')
                    .then((response) => {
                        this.list = response.data.payload
                            ? (response.data.payload as Example[])
                            : [];
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        add() {
            return new Promise((resolve, reject) => {
                api.call
                    .post('/example', this.create)
                    .then((response) => {
                        notification({
                            type: response.data.type,
                            title: 'messages.title.success',
                            text: 'example.created.success',
                        });
                        this.getList();
                        resolve(response.data.payload);
                    })
                    .catch((error) => {
                        notification({
                            type: 'error',
                            title: 'messages.title.error',
                            text:
                                'example.created.' +
                                error.response.data.message.replaceAll(' ', '_'),
                        });
                        reject(error);
                    });
            });
        },
        get(id: string) {
            return new Promise((resolve, reject) => {
                api.call
                    .get('/example/' + id)
                    .then((response) => {
                        this.current = response.data.payload;
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        update() {
            return new Promise((resolve, reject) => {
                api.call
                    .put('/example', this.current)
                    .then((response) => {
                        notification({
                            type: response.data.type,
                            title: 'messages.title.success',
                            text: 'example.updated.success',
                        });

                        resolve(response.data.payload);
                    })
                    .catch((error) => {
                        notification({
                            type: 'error',
                            title: 'messages.title.error',
                            text:
                                'example.updated.' +
                                error.response.data.message.replaceAll(' ', '_'),
                        });
                        reject(error);
                    });
            });
        },
        delete() {
            return new Promise((resolve, reject) => {
                api.call
                    .delete('/example/' + this.current.id)
                    .then((response) => {
                        this.current = {} as Example;
                        notification({
                            type: response.data.type,
                            title: 'messages.title.success',
                            text: 'example.deleted.success',
                        });
                        this.getList();
                        resolve(response.data.payload);
                    })
                    .catch((error) => {
                        notification({
                            type: 'error',
                            title: 'messages.title.error',
                            text:
                                'example.deleted.' +
                                error.response.data.message.replaceAll(' ', '_'),
                        });
                        reject(error);
                    });
            });
        },
    },
});
