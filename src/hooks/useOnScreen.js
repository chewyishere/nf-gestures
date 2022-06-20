import { useState, useEffect, useRef } from 'react';

function buildThresholdList() {
  let thresholds = [];
  let numSteps = 20;

  for (let i = 1.0; i <= numSteps; i++) {
    let ratio = i / numSteps;
    thresholds.push(ratio);
  }

  thresholds.push(0);
  return thresholds;
}

function useOnScreen(ref, rootMargin = '0px') {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false);
  const [ratio, setRatio] = useState([]);
  const prevRatioRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
        // if (entry.intersectionRatio > prevRatioRef.current) {
        setRatio(entry.intersectionRatio);
        // } else {
        //   setRatio(entry.intersectionRatio);
        // }

        // prevRatioRef.current = entry.intersectionRatio;
      },
      {
        rootMargin,
        threshold: buildThresholdList(),
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      ref.current && observer.unobserve(ref.current);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return { isIntersecting, ratio };
}

export default useOnScreen;
