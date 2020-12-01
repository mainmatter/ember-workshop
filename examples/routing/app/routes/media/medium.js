import Route from "@ember/routing/route";
import delayedResponse from "../../utils/delayed-response";

export default class MediumRoute extends Route {
  model(params) {
    const title = `The individual medium for ID ${params.medium_id}`;

    return delayedResponse({ title });
  }
}
