import * as React from 'react';

import * as Elevated from '@pitaman71/omniglot-introspect';

import { Grid } from '@material-ui/core';
import * as MuiIcons from '@material-ui/icons';

import { Annotations, Dialogues, Inspectors, Modules, Properties, Relations, Stores, Streams, Views } from '@pitaman71/omniglot-live-data';
import { MaterialUi, Debug } from '@pitaman71/omniglot-live-react';

import * as NounProject from './NounProject';
import * as Database from './Database';

import * as D3 from './D3';

const __moduleName__ = 'omniglot-live-react.Demo.Decorators';

export const makeAnnotations = new class implements Annotations.Maker<JSX.Element> {
    property(descriptor: Properties.Descriptor<any>): Annotations.Annotation<JSX.Element> {
        if(descriptor === Modules.Media.ImageData.Descriptor) {
            return { label: (<span>Image Data URI</span>) };
        } else if(descriptor === Modules.Identity.PersonName.Descriptor) {
            return { label: (<span>Name</span>) };
        } else if(descriptor === Modules.Identity.BirthDate.Descriptor) {
            return { label: (<span>Date of Birth</span>) };
        } else if(descriptor === Modules.Identity.BirthGender.Descriptor) {
            return { label: (<span>Gender at Birth</span>) };
        } else if(descriptor === Modules.Profile.Handle.Descriptor) {
            return { label: (<span>@profile.handle</span>) };
        } else if(descriptor === Modules.Contacts.Email.Descriptor) {
            return { label: (<span>Email Address</span>) };
        } else if(descriptor === Database.HasDonationCount.Descriptor) {
            return { label: (<span>Donation Count</span>) };
        } else if(descriptor === Database.HasFoodAllergies.Descriptor) {
            return { label: (<span>Food Allergies</span>) };
        } else if(descriptor === Database.HasMealSelection.Descriptor) {
            return { label: (<span>Meal Preference</span>) };
        } else if(descriptor === Database.HasMusicTastes.Descriptor) {
            return { label: (<span>Music Genres</span>) };
        }
        return { label: (<span>?</span>) };
    }

    view(descriptor: Views.Descriptor<any>): Annotations.Annotation<JSX.Element> {
        if(descriptor === Database.FieldTest1.Descriptor)
            return { 
                icon: <MuiIcons.AllInboxOutlined/>,
                label: (<span>Thing1</span>) 
            }
        else if(descriptor === Database.FieldTest2.Descriptor)
            return { 
                icon: <MuiIcons.AllOutOutlined/>,
                label: (<span>Thing2</span>) 
            }
        return { 
            icon: <MuiIcons.ErrorOutlined/>,
            label: <span>?</span> 
        };
    }

    relation(
        via: Relations.Descriptor<any>,
        from?: Dialogues.Descriptor<any>,
        to?: Dialogues.Descriptor<any>        
    ): Annotations.Annotation<JSX.Element> {
        if(via === Database.HasFieldTest1.Descriptor)
            return { 
                icon: <MuiIcons.AllInboxOutlined/>,
                label: (<span>Thing1</span>) 
            }
        else if(via === Database.HasFieldTest2.Descriptor)
            return { 
                icon: <MuiIcons.AllOutOutlined/>,
                label: (<span>Thing2</span>) 
            }
        else if(via === Modules.Profile.ToProfilePhoto.Descriptor)
            return { 
                icon: <MuiIcons.Portrait/>,
                label: (<span>Avatars</span>) 
            }

        return { 
            icon: <MuiIcons.ErrorOutlined/>,
            label: <span>?</span> 
        };
    }

    dialogue(descriptor: Dialogues.Descriptor<any>): Annotations.Annotation<JSX.Element> {
        if(descriptor === Modules.Media.ManageAsset.Descriptor) {
            return {
                icon: <MuiIcons.Portrait/>,
                label: (<span>Photos</span>)
            }
        } else if(descriptor === Modules.Profile.SetupYourProfile.Descriptor) {
            return {
                icon: <MuiIcons.Face/>,
                label: (<span>Profile</span>)
            }
        } else if(descriptor === Modules.Profile.Why.Descriptor) {
            return {
                icon: <MuiIcons.Help/>,
                label: (<span>Why Do I Need a Profile?</span>)
            }
        } else if(descriptor === Modules.Identity.Why.Descriptor) {
            return {
                icon: <MuiIcons.Help/>,
                label: (<span>Why Do I Need an Account?</span>)
            }
        } else if(descriptor === Database.Home.Descriptor) {
            return {
                icon: <MuiIcons.HomeOutlined/>,
                label: (<span>Home</span>)
            }
        } else if(descriptor === Database.Teams.Descriptor) {
            return {
                icon: <NounProject.Team color={'white'}/>,
                label: (<span>Team</span>)
            }
        }
        return { 
            icon: <MuiIcons.ErrorOutlined/>,
            label: <span>?</span> 
        };
    }

    control(descriptor: any): Annotations.Annotation<JSX.Element> {
        if(descriptor === 'submit') {
            return {
                icon: <MuiIcons.Done/>,
                label: (<span>Submit</span>)
            }
        } else if(descriptor === 'undo') {
            return {
                icon: <MuiIcons.Undo/>,
                label: (<span>Undo</span>)
            }
        } else if(descriptor === 'clear') {
            return {
                icon: <MuiIcons.ClearAll/>,
                label: (<span>Clear</span>)
            }
        } else if(descriptor === 'cancel') {
            return {
                icon: <MuiIcons.Cancel/>,
                label: (<span>Undo</span>)
            }
        } else if(descriptor === 'close') {
            return {
                icon: <MuiIcons.Close/>,
                label: (<span>Close</span>)
            }
        } else if(descriptor === 'back') {
            return {
                icon: <MuiIcons.Backup/>,
                label: (<span>Close</span>)
            }
        } else if(descriptor === 'start') {
            return {
                icon: <MuiIcons.Edit/>,
                label: (<span>Start</span>)
            }
        } else if(descriptor === 'resume') {
            return {
                icon: <MuiIcons.Edit/>,
                label: (<span>Resume</span>)
            }
        } else if(descriptor === 'revise') {
            return {
                icon: <MuiIcons.Edit/>,
                label: (<span>Revise</span>)
            }
        }
        return {
            icon: <MuiIcons.ErrorOutline/>,
            label: (<span>?</span>)
        }
    }

};

export const makeInspectors = new class implements Inspectors.Maker<JSX.Element> {
    property(descriptor: Properties.Descriptor<any>): Inspectors.MakePropertyInspector<JSX.Element, any, Elevated.Domain<any>> { 
        return new class implements Inspectors.MakePropertyInspector<JSX.Element, any, Elevated.Domain<any>> {
            scalar(stream: Streams.ScalarStream<any, Elevated.Domain<any>>): JSX.Element {
                const annotations = makeAnnotations.property(descriptor);
                if(descriptor === Modules.Media.ImageData.Descriptor) {
                    return <MaterialUi.AsTextField.String {...annotations} stream={stream as any}></MaterialUi.AsTextField.String>;
                } else if(descriptor === Modules.Identity.PersonName.Descriptor) {
                    return <MaterialUi.AsIdentity.PersonName {...annotations} stream={stream as any}></MaterialUi.AsIdentity.PersonName>;
                } else if(descriptor === Modules.Identity.BirthGender.Descriptor) {
                    return <MaterialUi.AsSelector.OfScalar {...annotations} maxCount={100} ascending={true} stream={stream as any}></MaterialUi.AsSelector.OfScalar>;
                } else if(descriptor === Modules.Identity.BirthDate.Descriptor) {
                    return <MaterialUi.AsTemporal.Date {...annotations} stream={stream as any}></MaterialUi.AsTemporal.Date>;
                } else if(descriptor === Modules.Profile.Handle.Descriptor) {
                    return <MaterialUi.AsTextField.String {...annotations} stream={stream as any}></MaterialUi.AsTextField.String>;
                } else if(descriptor === Modules.Contacts.Email.Descriptor) {
                    return <MaterialUi.AsTextField.Email {...annotations} stream={stream as any}></MaterialUi.AsTextField.Email>;
                } else if(descriptor === Database.HasDonationCount.Descriptor) {
                    return <MaterialUi.AsTextField.Number {...annotations} stream={stream as any}></MaterialUi.AsTextField.Number>;
                } else if(descriptor === Database.HasMealSelection.Descriptor) {
                    return <MaterialUi.AsSelector.OfScalar {...annotations} maxCount={Database.HasFoodAllergies.Descriptor.values.length} ascending={true} stream={stream as any}></MaterialUi.AsSelector.OfScalar>;
                }
                return <React.Fragment>Unrecognized scalar stream type {descriptor.canonicalName}</React.Fragment>;
            }
            set(stream: Streams.SetStream<any, Elevated.Domain<any>>): JSX.Element {
                const annotations = makeAnnotations.property(descriptor);
                if(descriptor === Database.HasFoodAllergies.Descriptor) {
                    return <MaterialUi.AsCheckboxes.OfSet {...annotations} maxCount={Database.HasFoodAllergies.Descriptor.values.length} ascending={true} stream={stream as any}></MaterialUi.AsCheckboxes.OfSet>;
                } else if(descriptor === Database.HasMusicTastes.Descriptor) {
                    return <MaterialUi.AsChips.OfSet {...annotations} maxCount={Database.HasMusicTastes.Descriptor.values.length} ascending={true} stream={stream as any}></MaterialUi.AsChips.OfSet>;
                }
                return <React.Fragment>Unrecognized set stream type {descriptor.canonicalName}</React.Fragment>;
            }
            sequence(stream: Streams.SequenceStream<any, Elevated.Domain<any>>): JSX.Element {
                return <React.Fragment>Unsupported stream cardinality sequence</React.Fragment>;
            }
            map<KeyType>(stream: Streams.MapStream<KeyType, any, Elevated.Domain<any>>): JSX.Element {
                return <React.Fragment>Unsupported stream cardinality map</React.Fragment>;
            }
        }
    }
    relation<BindingType>(descriptor: Relations.Descriptor<BindingType>): Inspectors.MakeRelationInspector<BindingType, JSX.Element> {
        return new class implements Inspectors.MakeRelationInspector<BindingType, JSX.Element> {
            out(stream: Streams.RelationStream<BindingType>): JSX.Element { 
                let result: JSX.Element = <React.Fragment/>;
                if((descriptor as any) === Modules.Profile.ToProfilePhoto.Descriptor) {
                    result = <MaterialUi.ViewRelation.AsTiles stream={stream} pixelSize={{ height: 200, width: 150 }} descriptors={Database.DescriptorsContext} makeAnnotations={makeAnnotations} makeInspectors={makeInspectors}/>
                }
                return (
                    <Debug.Boundary name={`${__moduleName__}.makeInspectors.relation.out(${stream.anchor.descriptor.makePersistKey(stream.anchor.binding)})`}>
                        {result}
                    </Debug.Boundary>
                )
            }
        }
    }
    panel<DialogueTypeParams extends Dialogues.TypeParams>(
        instance: Dialogues.Instance<DialogueTypeParams>,
        zone: Stores.Zone
    ): JSX.Element {
        if(instance.descriptor === Modules.Media.ManageAsset.Descriptor) {
            return (<MaterialUi.AsMedia.Panel instance={instance}/>);
        } else if(instance.descriptor === Database.Teams.Descriptor) {
            return (<D3.StaticDiagramDemo pixelSize={{ height: 480, width: 640 }}/>);
        } else {
            const builder = new MaterialUi.ViewDialogue.PanelGenerator(makeAnnotations, makeInspectors, instance, zone);
            builder.begin();
            instance.descriptor.build(builder);
            builder.end();
            return (
                <Grid container>
                    <Grid item xs={12}>
                            {builder.elements}
                    </Grid>
                </Grid>
            );
        }
    }
    preview<DialogueTypeParams extends Dialogues.TypeParams>(
        instance: Dialogues.Instance<DialogueTypeParams>,
        zone: Stores.Zone,
        pixelSize: { height: number, width: number }
    ): JSX.Element {
        if(instance.descriptor === Modules.Media.ManageAsset.Descriptor) {
            return (<MaterialUi.AsMedia.Preview instance={instance} pixelSize={pixelSize}/>);
        } else {
            return makeAnnotations.dialogue(instance.descriptor).icon || <MuiIcons.Error/>;
        }
    }
    headline<DialogueTypeParams extends Dialogues.TypeParams>(
        instance: Dialogues.Instance<DialogueTypeParams>,
        zone: Stores.Zone
    ): JSX.Element {
        return (<MaterialUi.ViewDialogue.Headline instance={instance}/>)
    }
    status<DialogueTypeParams extends Dialogues.TypeParams>(
        instance: Dialogues.Instance<DialogueTypeParams>,
        zone: Stores.Zone
    ): JSX.Element {
        return (<MaterialUi.ViewDialogue.Status instance={instance}/>)
    }
    entrances<DialogueTypeParams extends Dialogues.TypeParams>(
        instance: Dialogues.Instance<DialogueTypeParams>,
        zone: Stores.Zone
    ): JSX.Element {
        return (<MaterialUi.ViewDialogue.Entrances makeAnnotations={makeAnnotations} instance={instance}/>)
    }
}
