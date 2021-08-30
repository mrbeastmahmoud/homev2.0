import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import { useSession } from "next-auth/client";
import Typography from "@material-ui/core/Typography";
import router from "next/router";

const addfunds = () => {
  router.push("./Funds");
};
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        ></IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div onClick={handleClickOpen}>
        <p className="hover:cursor-pointer">Add new</p>
        <p className="font-extrabold md:text-sm">Funds</p>
      </div>

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Adding Funds alert !
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Adding new funds to buy whatever you want and whenever you want plz
            notice this will need admin aprovall
          </Typography>
          <Typography gutterBottom>
            you can send cash to Mahmoud hamed main account in syrian bank or
            contact mahmoud on his email to add funds
          </Typography>
          <Typography gutterBottom>
            else you can call +963968451924 for more help
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              router.push("/Funds");
            }}
            color="primary"
          >
            Agreed
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
