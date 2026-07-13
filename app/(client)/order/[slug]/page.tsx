"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
  CheckCircle2,
  ChevronLeft,
  CircleAlert,
  MapPin,
  Package,
  Truck,
} from "lucide-react";
import toast from "react-hot-toast";
import Container from "@/components/Container";
import OrdersAuthGate from "@/components/auth/OrdersAuthGate";
import PriceFormatter from "@/components/layout/Products/PriceFormatter";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  canCustomerCancelOrder,
  cancelCustomerOrder,
  type CustomerOrder,
  type CustomerOrderStatus,
  getCustomerOrder,
} from "@/lib/orderService";

const statusClassName: Record<CustomerOrderStatus, string> = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-sky-100 text-sky-800",
  processing: "bg-violet-100 text-violet-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-red-100 text-red-800",
};

const formatStatus = (status: CustomerOrderStatus) =>
  `${status.charAt(0).toUpperCase()}${status.slice(1)}`;

const formatDate = (value: CustomerOrder["createdAt"]) => {
  if (!value) return "Date unavailable";

  return new Intl.DateTimeFormat("en-NP", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value.toDate());
};

const cancellationMessage = (status: CustomerOrderStatus) => {
  if (status === "shipped") {
    return "This order has already shipped. If you need to cancel it, please contact support.";
  }

  if (status === "delivered") {
    return "This order has been delivered and can no longer be cancelled.";
  }

  if (status === "cancelled") {
    return "This order has already been cancelled.";
  }

  return null;
};

const OrderDetailPage = () => {
  const params = useParams<{ slug: string }>();
  const { isLoaded, isSignedIn, user } = useUser();
  const [order, setOrder] = useState<CustomerOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCancelling, setIsCancelling] = useState(false);
  const orderId = params.slug;
  const redirectUrl = `/order/${encodeURIComponent(orderId)}`;

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn || !user?.id || !orderId) return;

    let isCurrent = true;

    const loadOrder = async () => {
      setIsLoading(true);

      try {
        const customerOrder = await getCustomerOrder(orderId, user.id);

        if (isCurrent) setOrder(customerOrder);
      } catch (loadError) {
        console.error("Unable to load customer order:", loadError);

        if (isCurrent) setOrder(null);
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    };

    loadOrder();

    return () => {
      isCurrent = false;
    };
  }, [isLoaded, isSignedIn, orderId, user?.id]);

  const handleCancel = async () => {
    if (!order || !user?.id) return;

    setIsCancelling(true);

    try {
      const cancelledOrder = await cancelCustomerOrder(order.id, user.id);
      setOrder(cancelledOrder);
      toast.success("Your order has been cancelled.");
    } catch (cancelError) {
      const message =
        cancelError instanceof Error
          ? cancelError.message
          : "Unable to cancel this order right now.";
      toast.error(message);
    } finally {
      setIsCancelling(false);
    }
  };

  if (!isLoaded) {
    return (
      <Container className="py-10">
        <Skeleton className="h-9 w-32" />
        <Skeleton className="mt-8 h-64 w-full" />
      </Container>
    );
  }

  if (!isSignedIn || !user?.id) {
    return <OrdersAuthGate redirectUrl={redirectUrl} />;
  }

  if (isLoading) {
    return (
      <Container className="py-10">
        <Skeleton className="h-9 w-32" />
        <Skeleton className="mt-8 h-64 w-full" />
        <Skeleton className="mt-5 h-64 w-full" />
      </Container>
    );
  }

  if (!order) {
    return (
      <Container className="py-16 sm:py-24">
        <Card className="mx-auto max-w-lg text-center">
          <CardContent className="py-12">
            <CircleAlert className="mx-auto h-12 w-12 text-muted-foreground" />
            <h1 className="mt-5 text-xl font-semibold">Order not found</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              This order is unavailable or does not belong to your account.
            </p>
            <Link
              href="/order"
              className="mt-6 inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-primary/90"
            >
              View my orders
            </Link>
          </CardContent>
        </Card>
      </Container>
    );
  }

  const canCancel = canCustomerCancelOrder(order.status);
  const cancellationNotice = cancellationMessage(order.status);

  return (
    <Container className="py-10 sm:py-14">
      <Link
        href="/order"
        className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        Back to my orders
      </Link>

      <div className="mt-6 flex flex-col gap-5 border-b border-border pb-7 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">Order details</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            {order.orderNumber}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Placed {formatDate(order.createdAt)}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`rounded-full px-3 py-1.5 text-sm font-semibold ${statusClassName[order.status]}`}
          >
            {formatStatus(order.status)}
          </span>
          <Button
            variant="destructive"
            onClick={handleCancel}
            disabled={!canCancel || isCancelling}
          >
            {isCancelling ? "Cancelling..." : "Cancel order"}
          </Button>
        </div>
      </div>

      {cancellationNotice && (
        <Alert className="mt-6 border-amber-200 bg-amber-50 text-amber-950">
          <Truck />
          <AlertTitle>Cancellation unavailable</AlertTitle>
          <AlertDescription className="text-amber-900">
            {cancellationNotice}
          </AlertDescription>
        </Alert>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Items in this order</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={`${item.productId}-${item.sku}`}
                  className="flex gap-4 border-b border-border pb-4 last:border-0 last:pb-0"
                >
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-surface">
                    {item.thumbnail ? (
                      // The thumbnail comes from the immutable order record, so it remains accurate after a product changes.
                      <Image
                        src={item.thumbnail}
                        alt={item.title || "Ordered product"}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Package className="m-5 h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{item.title || "Product"}</p>
                    {item.sku && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        SKU: {item.sku}
                      </p>
                    )}
                    <p className="mt-1 text-sm text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <PriceFormatter
                      amount={(item.price - item.discount) * item.quantity}
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.quantity} × <PriceFormatter amount={item.price - item.discount} />
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order progress</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-5">
                {order.timeline.map((entry, index) => (
                  <li key={`${entry.status}-${index}`} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="font-medium">{formatStatus(entry.status)}</p>
                      {entry.note && (
                        <p className="mt-1 text-sm text-muted-foreground">
                          {entry.note}
                        </p>
                      )}
                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatDate(entry.at)}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <PriceFormatter amount={order.totals.subtotal} />
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Discount</span>
                <PriceFormatter amount={-order.totals.discount} className="text-red-600" />
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <PriceFormatter amount={order.totals.shipping} />
              </div>
              <div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
                <span>Total</span>
                <PriceFormatter amount={order.totals.total} className="text-base" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delivery address</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-3 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <address className="not-italic leading-6">
                <p className="font-medium text-text">
                  {order.shippingAddress.fullName}
                </p>
                <p>{order.shippingAddress.address}</p>
                <p>
                  {order.shippingAddress.city}
                  {order.shippingAddress.district
                    ? `, ${order.shippingAddress.district}`
                    : ""}
                  {order.shippingAddress.zipCode
                    ? ` ${order.shippingAddress.zipCode}`
                    : ""}
                </p>
                <p>{order.shippingAddress.phone}</p>
              </address>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p className="font-medium capitalize text-text">
                {order.payment.method} on delivery
              </p>
              <p className="mt-1">
                {order.payment.verified
                  ? "Payment verified"
                  : "Payment will be collected on delivery."}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default OrderDetailPage;
