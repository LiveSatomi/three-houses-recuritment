import * as React from "react";
import bemNames from "util/bemnames";
import "./Opportunity.scss";
import { Col } from "react-bootstrap";

const bem = bemNames.create("Opportunity");

type OpportunityProps = {
    onClick: () => void;
    imageUrl: string;
    imageTitle: string;
    isSelected: boolean;
};

type OpportunityState = {
    image: "";
};

export default class Opportunity extends React.Component<
    OpportunityProps,
    OpportunityState
> {
    constructor(props: OpportunityProps, state: OpportunityState) {
        super(props);
        this.state = state;
    }

    componentDidMount(): void {
        import(`data/${this.props.imageUrl}`)
            .then((image) => {
                this.setState({
                    image: image.default,
                });
            })
            .catch((reason) => {
                this.setState({
                    image: "",
                });
            });
    }

    render() {
        return (
            <Col
                onClick={this.props.onClick}
                className={bem.b("border")}
                xs={2}
            >
                {this.getChildren()}
            </Col>
        );
    }

    getChildren() {
        let title = this.props.imageTitle;
        let selectedMarker = <></>;
        if (this.props.isSelected) {
            selectedMarker = <span className={bem.e("selected")}>✓</span>;
        }
        return (
            <>
                <img src={this.state.image} title={title} alt={title} />
                {selectedMarker}
            </>
        );
    }
}