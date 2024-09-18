MaskedInput.propTypes = {
    mask: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.func,
      PropTypes.bool,
      PropTypes.shape({
        mask: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
        pipe: PropTypes.func,
      }),
    ]).isRequired,
    guide: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    pipe: PropTypes.func,
    placeholderChar: PropTypes.string,
    keepCharPositions: PropTypes.bool,
    showMask: PropTypes.bool,
  }
  
  MaskedInput.defaultProps = {
    render: (ref, props) => <input ref={ref} {...props} />
  }