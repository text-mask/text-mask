import React from "react";

const HelpLink = ({ section }) => {
  return (
    <a
      className="small"
      href={`https://github.com/im-open/text-mask/blob/master/componentDocumentation.md#${section}`}
      target="_blank"
    >
      <span className="glyphicon glyphicon-question-sign" />
    </a>
  );
};

export const RightColumn = ({ children, small }) => {
  const columnSize = small ? "2" : "8";

  return <div className={`col-sm-${columnSize} col-xs-12`}>{children}</div>;
};

export const Row = ({ children, name, value, noHelpLink, small }) => {
  return (
    <div className="form-group row">
      {(name && value && (
        <label htmlFor={value} className="col-sm-4 col-xs-12 control-label">
          {name} {noHelpLink !== true && <HelpLink section={value} />}
        </label>
      )) || <div className="col-sm-4 col-xs-12" />}

      <RightColumn small={small}>{children}</RightColumn>
    </div>
  );
};

export const DemoTop = () => (
  <div>
    <p>
      <img
        src="./assets/logo.png"
        alt="Text Mask"
        className="img-responsive"
        width="331"
        height="67"
      />
    </p>

    <p>
      This is a demo of Text Mask. Try filling out the masked input field. Try
      entering bad characters. Pasting. Deleting. Or using auto-fill. Try it on
      mobile too.
    </p>
  </div>
);

export const DemoBottom = () => (
  <div className="col-sm-8 col-sm-offset-4">
    <p>
      For more information about installation, usage, and documentation, see the{" "}
      <a href="https://github.com/im-open/text-mask/">GitHub page</a>.
    </p>

    <p>
      For any questions, suggestions, or feature requests, please{" "}
      <a href="https://github.com/im-open/text-mask/issues" target="_blank">
        file an issue
      </a>
      !
    </p>
  </div>
);

const Link = ({ url, text }) => (
  <a className="alert-link" target="_blank" href={url}>
    {text}
  </a>
);

export const Links = {
  createAutoCorrectedDatePipe() {
    return (
      <Link
        url="https://github.com/im-open/text-mask/tree/master/addons#createautocorrecteddatepipe"
        text="createAutoCorrectedDatePipe"
      />
    );
  },
  addon() {
    return (
      <Link
        url="https://github.com/im-open/text-mask/tree/master/addons/#readme"
        text="addon"
      />
    );
  },
  maskFunction() {
    return (
      <Link
        url="https://github.com/im-open/text-mask/blob/master/componentDocumentation.md#mask-function"
        text="mask function"
      />
    );
  },
  pipe() {
    return (
      <Link
        url="https://github.com/im-open/text-mask/blob/master/componentDocumentation.md#pipe"
        text="pipe"
      />
    );
  },
  createNumberMask() {
    return (
      <Link
        url="https://github.com/im-open/text-mask/tree/master/addons#createnumbermask"
        text="createNumberMask"
      />
    );
  },
  emailMask() {
    return (
      <Link
        url="https://github.com/im-open/text-mask/tree/master/addons#emailmask"
        text="emailMask"
      />
    );
  },
};

export const Panel = ({ title, children }) => (
  <div className="panel panel-default" style={{ marginBottom: 0 }}>
    {title && <div className="panel-heading">{title}</div>}

    <div className="panel-body">{children}</div>
  </div>
);

export const OnOffSwitch = ({ name, value, onChange }) => (
  <div>
    <label className="radio-inline">
      <input
        type="radio"
        name={name}
        checked={value}
        onChange={() => onChange(true)}
      />
      On
    </label>

    <label className="radio-inline">
      <input
        type="radio"
        name={name}
        checked={!value}
        onChange={() => onChange(false)}
      />
      Off
    </label>
  </div>
);
