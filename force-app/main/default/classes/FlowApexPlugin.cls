public class FlowApexPlugin {

    @InvocableMethod(label='Call Apex from Flow Demo' description='Accept the text and return the value from Apex')
    public static List<FlowResponseParam> doAction(List<FlowRequestParam> lstRequest) {
        List<FlowResponseParam>  lstResp = new List<FlowResponseParam> ();
        if(lstRequest.size() > 0){
            FlowRequestParam flowReq = lstRequest[0];
            FlowResponseParam flowRes = new FlowResponseParam();
            flowRes.result = 'Hello ' + flowReq.sampleText + ', Now this value coming From Apex class';
            lstResp.add(flowRes);
        }
        return lstResp;
    }

    public class FlowRequestParam {
        @InvocableVariable(required=true  label= 'Sample Text')
        public String sampleText;
    }

    public class FlowResponseParam {
        @InvocableVariable()
        public String result;
    }
}