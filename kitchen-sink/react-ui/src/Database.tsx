import * as React from 'react';

import * as Elevated from '@pitaman71/omniglot-introspect';

import { Dialogues, Domains, Modules, Objects, Properties, Relations, Views } from '@pitaman71/omniglot-live-data';

import { Debug } from '@pitaman71/omniglot-live-react';

import genres from 'corpora/data/music/genres.json';

const __moduleName__ = 'omniglot-live-react.Demo.Database';

export type ObjectHandle = string;

export namespace FieldTest1 {
    interface BindingType { the: Objects.Binding<string> }

    export const Descriptor = new class _Descriptor extends Views.Descriptor<BindingType> {
        canonicalName = `${__moduleName__}.FieldTest1`
        build(builder: Views.Builder<BindingType>) {
            builder.begin();
            builder.object('the');
            builder.property(Modules.Identity.PersonName.Descriptor, binding => { return { person: binding.the } });
            builder.property(Modules.Identity.BirthDate.Descriptor, binding => { return { person: binding.the } });
            builder.property(Modules.Contacts.Email.Descriptor, binding => { return { person: binding.the } });
            builder.in(this, HasFieldTest1.Descriptor, binding => { return { the: binding.fieldTest1 } as BindingType });
            builder.end();
        }
    }();
}

export namespace HasDonationCount {
    export type TypeParams = {
        Binding: { attendee: Objects.Binding<string> },
        Value: number,
        Domain: Elevated.Domain<number>
    };
    export const Descriptor = new class _Descriptor extends Properties.Descriptor<TypeParams> {
        canonicalName = `${__moduleName__}.HasDonationCount`
        build(builder: Properties.Builder<TypeParams>): void {
            builder.object('attendee');
            builder.measure(Domains.Values.makeRangeClass(`${this.canonicalName}.values`, 0,10,1).domain());
            builder.scalar();
        }
    }
}

export namespace HasFoodAllergies {
    export type TypeParams = {
        Binding: { attendee: Objects.Binding<string> },
        Value: string,
        Domain: Elevated.Domain<string>
    };
    export const Descriptor = new class _Descriptor extends Properties.Descriptor<TypeParams> {
        values = Domains.Values.makeEnumerationClass(`${__moduleName__}.HasFoodAllergies.values`, 'peanuts', 'soy', 'eggs');
        canonicalName = `${__moduleName__}.HasFoodAllergies`
        build(builder: Properties.Builder<TypeParams>): void {
            builder.object('attendee');
            builder.measure(this.values.domain());
            builder.set();
        }
    }
}

export namespace HasMealSelection {
    export type TypeParams = {
        Binding: { 
            attendee: Objects.Binding<string>,
            event: Objects.Binding<string>
         },
        Value: string,
        Domain: Elevated.Domain<string>
    };

    export const Descriptor = new class _Descriptor extends Properties.Descriptor<TypeParams> {
        values = Domains.Values.makeEnumerationClass(`${__moduleName__}.HasMealSelection.values`, 'steak', 'chicken', 'fish', 'vegetarian' );
        canonicalName = `${__moduleName__}.HasMealSelection`
        build(builder: Properties.Builder<TypeParams>): void {
            builder.object('attendee');
            builder.object('event');
            builder.measure(this.values.domain());
            builder.scalar();
        }
    }
}

export namespace HasMusicTastes {
    export type TypeParams = {
        Binding: { 
            attendee: Objects.Binding<string>,
            event: Objects.Binding<string>
         },
        Value: string,
        Domain: Elevated.Domain<string>
    };

    export const Descriptor = new class _Descriptor extends Properties.Descriptor<TypeParams> {
        values = Domains.Values.makeEnumerationClass(`${__moduleName__}.HasMusicTastes.values`, ...genres.genres);
        canonicalName = `${__moduleName__}.HasMusicTastes`
        build(builder: Properties.Builder<TypeParams>): void {
            builder.object('attendee');
            builder.object('event');
            builder.measure(this.values.domain());
            builder.set();
        }
    }
}

export namespace FieldTest2 {
    interface BindingType { 
        attendee: Objects.Binding<string>,
        event: Objects.Binding<string>
    };
    export const Descriptor = new class _Descriptor extends Views.Descriptor<BindingType> {
        canonicalName = `${__moduleName__}.FieldTest2`
        build(builder: Views.Builder<BindingType>) {
            builder.begin();
            builder.object('attendee');
            builder.property(Modules.Identity.PersonName.Descriptor, binding => { return { person: binding.attendee }});
            builder.property(HasDonationCount.Descriptor, binding => { return { attendee: binding.attendee }});
            builder.property(HasFoodAllergies.Descriptor, binding => { return { attendee: binding.attendee }});
            builder.property(HasMealSelection.Descriptor, binding => { return { attendee: binding.attendee, event: binding.event }});
            builder.property(HasMusicTastes.Descriptor, binding => { return { attendee: binding.attendee, event: binding.event }});
            builder.in(this, HasFieldTest2.Descriptor, binding => { return { attendee: binding.fieldTest2, event: binding.fieldTest2 } as BindingType });
            builder.end();
        }
    }
}


export namespace HasFieldTest1 {
    interface BindingType {
        database: Objects.Binding<string>,
        fieldTest1: Objects.Binding<string>
    }

    export const Descriptor = new class extends Relations.Descriptor<BindingType> {
        canonicalName = 'Database.HasFieldTest1'
        build(builder: Relations.Builder<BindingType>): void {
            builder.object('database');
            builder.set();
            builder.object('fieldTest1');
        }
    }
}

export namespace HasFieldTest2 {
    interface BindingType {
        database: Objects.Binding<string>,
        fieldTest2: Objects.Binding<string>
    }

    export const Descriptor = new class extends Relations.Descriptor<BindingType> {
        canonicalName = 'Database.HasFieldTest2'
        build(builder: Relations.Builder<BindingType>): void {
            builder.object('database');
            builder.set();
            builder.object('fieldTest2');
        }
    }    
}


export namespace Database {
    interface BindingType { database: Objects.Binding<string> }
    export const Descriptor = new class _Descriptor extends Views.Descriptor<BindingType> {
        canonicalName = `${__moduleName__}.Database`;
        build(builder: Views.Builder<BindingType>) {
            builder.object('database');
            builder.out(this, HasFieldTest1.Descriptor, binding => { return HasFieldTest1.Descriptor.bindAnchor({ database: binding.database}) });
            builder.out(this, HasFieldTest2.Descriptor, binding  => { return HasFieldTest2.Descriptor.bindAnchor({ database: binding.database}) });
        }    
    }
} 

export namespace Home {
    export type TypeParams = {
        Binding: { database: Objects.Binding<string> },
        State: {},
        Direction: 'introduceYourself' | 'setupYourProfile',
        Status: void,
        Control: void
    }

    export const Descriptor = new class _Descriptor extends Dialogues.Descriptor<TypeParams> {
        canonicalName = `${__moduleName__}.Home`;
        initialize() { return new class {
            binding(default_: Partial<TypeParams["Binding"]>): TypeParams["Binding"] {
                return { database: default_.database || { objectId: '__database__'} };
            }
            state(default_: Partial<TypeParams["State"]>): TypeParams["State"] {
                return {} as TypeParams["State"];
            }
        } }
        enter(entrances: Dialogues.Entrances<TypeParams>) {
        }
        build(builder: Dialogues.Builder<TypeParams>): void {
            builder.route(
                'setupYourProfile', 
                Modules.Profile.SetupYourProfile.Descriptor,
                ({}) => Modules.Profile.SetupYourProfile.Descriptor.bind({ me: { objectId: '__me__' } })
            )
        }
    }
}

export namespace Teams {
    export type TypeParams = {
        Binding: { database: Objects.Binding<string> },
        State: {},
        Direction: void,
        Status: void,
        Control: void
    }

    export const Descriptor = new class _Descriptor extends Dialogues.Descriptor<TypeParams> {
        canonicalName = `${__moduleName__}.Teams`;
        initialize() { return new class {
            binding(default_: Partial<TypeParams["Binding"]>): TypeParams["Binding"] {
                return { database: default_.database || { objectId: '__database__'} };
            }
            state(default_: Partial<TypeParams["State"]>): TypeParams["State"] {
                return {} as TypeParams["State"];
            }
        } }
        enter(entrances: Dialogues.Entrances<TypeParams>) {
        }
        build(builder: Dialogues.Builder<TypeParams>): void {
        }
    }
}

export namespace Root {
    export type TypeParams = {
        Binding: { database: Objects.Binding<string> },
        State: {},
        Direction: 'home'|'teams',
        Status: void,
        Control: void
    }

    export const Descriptor = new class _Descriptor extends Dialogues.Descriptor<TypeParams> {
        canonicalName = `${__moduleName__}.Root`;
        initialize() { return new class {
            binding(default_: Partial<TypeParams["Binding"]>): TypeParams["Binding"] {
                return { database: default_.database || { objectId: '__database__'} };
            }
            state(default_: Partial<TypeParams["State"]>): TypeParams["State"] {
                return {} as TypeParams["State"];
            }
        } }
        enter(entrances: Dialogues.Entrances<TypeParams>) {
        }
        build(builder: Dialogues.Builder<TypeParams>): void {
            builder.route(
                'home',
                Home.Descriptor,
                ({binding}) => Home.Descriptor.bind(binding)
            )
            builder.route(
                'teams',
                Teams.Descriptor,
                ({binding}) => Teams.Descriptor.bind(binding)
            )
        }    
    }
}

export const DescriptorsContext = React.createContext<{ dialogues: Dialogues.Descriptor<any>[] }>({ dialogues: [] });

export function Provide(props: {
    children: JSX.Element[]|JSX.Element
}) {
    return (
        <DescriptorsContext.Provider value={{ dialogues: [
            Home.Descriptor,
            Teams.Descriptor,
            Root.Descriptor,
            Modules.Profile.SetupYourProfile.Descriptor,
            Modules.Media.ManageAsset.Descriptor
        ]}}>
            {props.children}
        </DescriptorsContext.Provider>
    )
}
