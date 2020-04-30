import * as React from "react";
import { Character, CharacterId } from "data/types/schemas/characterSchema";
import Opportunity from "../Opportunity";
import Database from "util/Database";
import { Facility, FacilityId } from "data/types/schemas/facilitySchema";
import Occurrence from "data/types/Occurrence";
import OccurrenceData from "data/types/OccurrenceData";

type FacilityOpportunityProps = {
    facility: FacilityId;
    partnerId: CharacterId;
    occurrence: Occurrence<OccurrenceData>;
    onRemove: (occurrence: Occurrence<OccurrenceData>) => void;
};

type FacilityOpportunityState = {
    facility: Facility;
    partner: Character;
};

export default class FacilityOpportunity extends React.Component<FacilityOpportunityProps, FacilityOpportunityState> {
    constructor(props: FacilityOpportunityProps, state: FacilityOpportunityState) {
        super(props);
        this.state = state;

        this.opportunitySelected = this.opportunitySelected.bind(this);
    }

    componentDidMount(): void {
        Database.getSingleton().then((database) => {
            database.fetchCharacter(this.props.partnerId).then((partner) => {
                this.setState({
                    partner: partner,
                });
            });
            database.fetchFacility(this.props.facility).then((facility) => {
                this.setState({
                    facility: facility,
                });
            });
        });
    }

    render() {
        if (this.state.facility === undefined || this.state.partner === undefined) {
            return <span>Loading</span>;
        } else {
            return (
                <Opportunity
                    onSelect={this.opportunitySelected}
                    imageUrl={this.state.facility.imageUrl}
                    imageTitle={this.state.facility.name + " with " + this.state.partner.name}
                />
            );
        }
    }

    private opportunitySelected() {
        this.props.onRemove(this.props.occurrence);
    }
}
