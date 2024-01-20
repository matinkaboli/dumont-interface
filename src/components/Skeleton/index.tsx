import React from 'react';
import LoadingSkeleton, { SkeletonProps } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Skeleton: React.FC<SkeletonProps> = ({ ...props }) => <LoadingSkeleton {...props} />;

Skeleton.displayName = 'Skeleton';

export default Skeleton;
