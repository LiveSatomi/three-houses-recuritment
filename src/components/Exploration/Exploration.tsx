import * as React from "react";
import bemNames from "util/bemnames";
import "./Exploration.scss";
import { Col, Row } from "react-bootstrap";
import { Character } from "data/types/schemas/characterSchema";
import { Monastery, RouteId } from "data/types/schemas/monasterySchema";
import GiftOpportunity from "components/Opportunity/GiftOpportunity/GiftOpportunity";
import FacilityOpportunity from "components/Opportunity/FacilityOpportunity/FacilityOpportunity";
import AdditionalOpportunity from "components/Opportunity/AdditionalOpportunity/AdditionalOpportunity";
import InstructionOpportunity from "components/Opportunity/InstructionOpportunity/InstructionOpportunity";
import Occurrence from "data/types/Occurrence";
import OccurrenceData from "data/types/OccurrenceData";
import ChoirData from "data/types/ChoirData";
import MerchantData from "data/types/MerchantData";
import CookingData from "data/types/CookingData";
import InstructionData from "data/types/InstructionData";
import QuestData from "data/types/QuestData";
import ShareMealData from "data/types/ShareMealData";

const bem = bemNames.create("Exploration");

type ExplorationProps = {
    character: Character;
    route: RouteId;
    chapter: number;
    event: number;
    monastery: Monastery;
    onAddOccurrence: (occurrence: Occurrence<OccurrenceData>) => Promise<void>;
    onRemoveOccurrence: (occurrence: Occurrence<OccurrenceData>) => Promise<void>;
    selectedOpportunities: Occurrence<OccurrenceData>[];
};

type ExplorationState = {};

export default class Exploration extends React.Component<ExplorationProps, ExplorationState> {
    constructor(props: ExplorationProps) {
        super(props);

        this.addOccurrence = this.addOccurrence.bind(this);
        this.removeOccurrence = this.removeOccurrence.bind(this);
    }

    render() {
        return (
            <Col className={bem.b("border")} xs={6}>
                <Row>
                    {this.mapComponentByType(
                        this.props.selectedOpportunities.filter(
                            (match) =>
                                match.characters.includes(this.props.character._id) &&
                                match.time.route === this.props.route &&
                                match.time.chapter === this.props.chapter &&
                                match.time.event === this.props.event
                        )
                    )}
                    <AdditionalOpportunity
                        key={"additional"}
                        character={this.props.character}
                        monastery={this.props.monastery}
                        route={this.props.route}
                        chapter={this.props.chapter}
                        event={this.props.event}
                        onAddOccurrence={this.addOccurrence}
                        onRemoveOccurrence={this.removeOccurrence}
                        selected={this.props.selectedOpportunities}
                    />
                </Row>
            </Col>
        );
    }

    /**
     * Maps occurrences to Components of the appropriate type and returns all the components
     * TODO possibly could make the mapper a utility with injected dependencies that know how to accept certain occurrence data by type
     * @param occurrences the full list of occurrences to map
     */
    mapComponentByType(occurrences: Occurrence<OccurrenceData>[]): JSX.Element[] {
        return this.filterOccurrence(occurrences, MerchantData)
            .map((occurrence: Occurrence<MerchantData>) => {
                return (
                    <GiftOpportunity key={occurrence._id} occurrence={occurrence} onRemove={this.removeOccurrence} />
                );
            })
            .concat(
                this.filterOccurrence(occurrences, ChoirData).map((occurrence: Occurrence<ChoirData>) => {
                    return (
                        <FacilityOpportunity
                            key={occurrence._id}
                            facility={occurrence.data.type}
                            occurrence={occurrence}
                            partnerId={occurrence.characters.filter((c) => this.props.character._id !== c)[0]}
                            onRemove={this.removeOccurrence}
                        />
                    );
                })
            )
            .concat(
                this.filterOccurrence(occurrences, CookingData).map((occurrence: Occurrence<CookingData>) => {
                    return (
                        <FacilityOpportunity
                            key={occurrence._id}
                            facility={occurrence.data.type}
                            occurrence={occurrence}
                            partnerId={occurrence.characters.filter((c) => this.props.character._id !== c)[0]}
                            onRemove={this.removeOccurrence}
                        />
                    );
                })
            )
            .concat(
                this.filterOccurrence(occurrences, QuestData).map((occurrence: Occurrence<QuestData>) => {
                    return (
                        <GiftOpportunity
                            key={occurrence._id}
                            occurrence={occurrence}
                            onRemove={this.removeOccurrence}
                        />
                    );
                })
            )
            .concat(
                this.filterOccurrence(occurrences, InstructionData).map((occurrence: Occurrence<InstructionData>) => {
                    return (
                        <InstructionOpportunity
                            key={occurrence._id}
                            occurrence={occurrence}
                            onRemove={this.removeOccurrence}
                        />
                    );
                })
            )
            .concat(
                this.filterOccurrence(occurrences, ShareMealData).map((occurrence: Occurrence<ShareMealData>) => {
                    return (
                        <FacilityOpportunity
                            key={occurrence._id}
                            facility={occurrence.data.type}
                            occurrence={occurrence}
                            partnerId={occurrence.characters.filter((c) => this.props.character._id !== c)[0]}
                            onRemove={this.removeOccurrence}
                        />
                    );
                })
            );
    }

    addOccurrence(occurrence: Occurrence<OccurrenceData>): Promise<void> {
        return this.props.onAddOccurrence(occurrence);
    }

    removeOccurrence(occurrence: Occurrence<OccurrenceData>): Promise<void> {
        return this.props.onRemoveOccurrence(occurrence);
    }

    // Function based on the following thread:
    // https://stackoverflow.com/questions/41921868/how-to-filter-a-list-of-types-by-a-generic-type-in-typescript
    filterOccurrence<A extends OccurrenceData>(
        occurrences: Occurrence<OccurrenceData>[],
        t: new (...args: any[]) => A
    ): Occurrence<A>[] {
        return occurrences.filter((o: Occurrence<OccurrenceData>) => {
            return o.data instanceof t;
        }) as Occurrence<A>[];
    }
}
