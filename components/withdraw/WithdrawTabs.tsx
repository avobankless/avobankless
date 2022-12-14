import { Alert, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { parseEther } from "ethers/lib/utils";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useWithdraw from "../../hooks/useWithdraw";
import { getWithdrawState } from "../../slices/withdrawSlice";
import WithdrawAmountInput from "../general/InputAmountWithMaximum";
import ScoreButton from "../navbar/buttons/ScoreButton";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div className="mt-lg space-y-md">{children}</div>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function WithdrawTabs({}) {
  const [value, setValue] = useState(0);
  const [earned, setEarned] = useState("---");
  const { withdraw, withdrawState, resetWithdraw, withdrawEvents } =
    useWithdraw();
  const [loading, setLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailureAlert, setShowFailureAlert] = useState(false);
  const [failureMessage, setFailureMessage] = useState("");
  const { selectedPositionInfo } = useSelector(getWithdrawState);

  useEffect(() => {
    if (withdrawState.status === "Success") {
      setShowSuccessAlert(true);
      setLoading(false);
      resetWithdraw();
    }
    if (
      withdrawState.status === "Fail" ||
      withdrawState.status === "Exception"
    ) {
      setFailureMessage(
        withdrawState.errorMessage ?? "Oops, something went wrong"
      );
      setShowFailureAlert(true);
      setLoading(false);
      resetWithdraw();
    }
  }, [
    withdrawState,
    resetWithdraw,
    setLoading,
    setShowFailureAlert,
    setShowSuccessAlert,
  ]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const onSubmitLiquidityTab = async (e: any) => {
    e.preventDefault();
    // const amount = parseEther(String(e.target.amountYieldProvider.value));
    withdraw(selectedPositionInfo.tokenId);
    setLoading(true);
  };

  const onSubmitRepayPoolTab = async (e: any) => {
    e.preventDefault();
    const amount = parseEther(String(e.target.amountRepayPool.value));
    setShowFailureAlert(true);
    setFailureMessage("Functionality not yet implemented");

    setLoading(true);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              "& .MuiTabs-flexContainer": { justifyContent: "space-evenly" },
            }}
            variant="fullWidth"
          >
            <Tab
              className="text-lg font-extrabold text-black"
              label="Liquidity Providers"
              {...a11yProps(0)}
            />
            <Tab
              className="text-lg font-extrabold text-black"
              label="Repayment pool"
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <form onSubmit={onSubmitLiquidityTab} className="space-y-md">
            <div className="space-y-md w-full">
              <WithdrawAmountInput
                name="amountYieldProvider"
                disabled={true}
                disabledText="Maximum for position"
                placeholder={null}
              />
            </div>
            <div className="flex justify-between w-full">
              <Typography variant="h6" component="span" className="font-bold">
                Earned
              </Typography>
              <Typography variant="h6" component="span" className="font-bold">
                {earned}
              </Typography>
            </div>
            <div className="flex justify-between w-full">
              <Typography variant="h6" component="span" className="font-bold">
                Available
              </Typography>
              <Typography variant="h6" component="span" className="font-bold">
                {selectedPositionInfo?.available ?? "---"}
              </Typography>
            </div>
            <ScoreButton
              text="Withdraw"
              twProps="!w-full mt-md"
              type="submit"
              loading={loading}
              disabled={loading}
            />
          </form>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <form onSubmit={onSubmitRepayPoolTab} className="space-y-md">
            <div className="space-y-md w-full">
              <WithdrawAmountInput name="amountRepayPool" />
            </div>
            <div className="flex justify-between w-full">
              <Typography variant="h6" component="span" className="font-bold">
                Earned
              </Typography>
              <Typography variant="h6" component="span" className="font-bold">
                {earned}
              </Typography>
            </div>
            <div className="flex justify-between w-full">
              <Typography variant="h6" component="span" className="font-bold">
                Available
              </Typography>
              <Typography variant="h6" component="span" className="font-bold">
                ---
              </Typography>
            </div>
            <ScoreButton
              text="Withdraw"
              twProps="!w-full mt-md"
              type="submit"
            />
          </form>
        </TabPanel>
      </Box>
      <div>
        {showFailureAlert && (
          <div className="mt-20 absolute bottom-20 left-20 w-96">
            <Alert
              severity="error"
              variant="filled"
              onClose={() => setShowFailureAlert(false)}
            >
              {failureMessage}
            </Alert>
          </div>
        )}
      </div>
      {showSuccessAlert && (
        <div className="mt-20 absolute bottom-20 left-20 w-96">
          <Alert
            severity="success"
            variant="filled"
            onClose={() => setShowSuccessAlert(false)}
          >
            Your funds have been withdrawn successfully!.
          </Alert>
        </div>
      )}
    </>
  );
}
